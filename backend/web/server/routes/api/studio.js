const path = require("path");
const fs = require("fs").promises;
const child_process = require("child_process");
const url = require("url");
const lodash = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const {
  filterDataUser,
  getContacts,
  login
} = require("../../utils/studio/aftral/functions");
const {
  getDataModel,
  getProductionRoot,
  getProductionPort
} = require("../../../config/config");
const {
  ROLES,
  RES_TO_COME
} = require(`../../../utils/${getDataModel()}/consts`);
const { sendCookie } = require("../../config/passport");
const {
  HTTP_CODES,
  NotFoundError,
  ForbiddenError
} = require("../../utils/errors");
const { getModels } = require("../../utils/database");
const { ACTIONS } = require("../../utils/studio/actions");
const { buildQuery, addComputedFields } = require("../../utils/database");

const router = express.Router();

const PRODUCTION_ROOT = getProductionRoot();
const PRODUCTION_PORT = getProductionPort();

router.get("/models", (req, res) => {
  const allModels = getModels();
  return res.json(allModels);
});

router.get("/roles", (req, res) => {
  console.log();
  return res.json(ROLES);
});

router.post("/file", (req, res) => {
  const { projectName, filePath, contents } = req.body;
  if (!(projectName && filePath && contents)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json();
  }
  const destpath = path.join(PRODUCTION_ROOT, projectName, "src", filePath);
  console.log(`Copying in ${destpath}`);
  return fs
    .writeFile(destpath, contents)
    .then(() => {
      return res.json();
    })
    .catch(err => {
      return res.status(HTTP_CODES.SYSTEM_ERROR).json(err);
    });
});

router.post("/install", (req, res) => {
  const { projectName } = req.body;
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json();
  }

  const destpath = path.join(PRODUCTION_ROOT, projectName);
  const result = child_process.execSync(
    "yarn install",
    {
      cwd: destpath
    },
    (error, stdout, stderr) => {
      console.log(`Error:${error}`);
      console.log(`Stdout:${stdout}`);
      console.log(`stderr:${stderr}`);
      if (error) {
        return res.status(HTTP_CODES.SYSTEM_ERROR).json(error);
      }
      return res.json();
    }
  );
  console.log(`Install result:${result}`);
  return res.json(result);
});

router.post("/build", (req, res) => {
  const { projectName } = req.body;
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json();
  }

  const destpath = path.join(PRODUCTION_ROOT, projectName);
  const result = child_process.execSync(
    "yarn build",
    {
      cwd: destpath
    },
    (error, stdout, stderr) => {
      console.log(`Error:${error}`);
      console.log(`Stdout:${stdout}`);
      console.log(`stderr:${stderr}`);
      if (error) {
        return res.status(HTTP_CODES.SYSTEM_ERROR).json(error);
      }
      return res.json();
    }
  );
  console.log(`Build result:${result}`);
  return res.json(result);
});

router.post("/start", (req, res) => {
  const { projectName } = req.body;
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json();
  }

  const destpath = path.join(PRODUCTION_ROOT, projectName);
  const result = child_process.exec(
    `serve -p ${PRODUCTION_PORT} build/`,
    {
      cwd: destpath
    },
    (error, stdout, stderr) => {
      console.log(`Error:${error}`);
      console.log(`Stdout:${stdout}`);
      console.log(`stderr:${stderr}`);
    }
  );
  console.log(`Start result:${result}`);
  return res.json(result);
});

router.post(
  "/action",
  passport.authenticate("cookie", { session: false }),
  (req, res) => {
    const action = req.body.action;
    const actionFn = ACTIONS[action];
    if (!actionFn) {
      console.error(`Unkown action:${action}`);
      return res.status(404).json(`Unkown action:${action}`);
    }

    return actionFn(req.body, req.user, req.get("Referrer"))
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        console.error(err);
        return res
          .status(err.status || HTTP_CODES.SYSTEM_ERROR)
          .json(err.message || err);
      });
  }
);

router.post("/login", (req, res) => {
  console.log(`Trying to log`);
  const { email, password } = req.body;

  return login(email, password)
    .then(user => {
      return sendCookie(user, res).json(user);
    })
    .catch(err => {
      console.log(err);
      return res
        .status(err.status || HTTP_CODES.SYSTEM_ERROR)
        .json(err.message || err);
    });
});

// router.post('/scormupdate', passport.authenticate('cookie', {session: false}), (req, res) => {
router.post("/scormupdate", (req, res) => {
  const value = req.body;
  const idRessource = req?.body?.cmi?.entry;
  const user = req.user;

  // console.log(value, idRessource, user)
  console.log(value);

  // const updateScorm = UserSessionData.findOneAndUpdate({
  //   user: user._id,
  // }, {
  //   user: user._id,
  // }, {
  //   upsert: true,
  //   new: true,
  // })
  //   .then(data => {
  //     const scormProgress = data?.modules_progress?.find(a => a.resource._id.toString() == idRessource.toString())
  //     if (scormProgress) {
  //       scormProgress.module_progress = value
  //     }
  //     else {
  //       data.modules_progress.push({
  //         resource: parent,
  //         module_progress: value,
  //       })
  //     }
  //     return data.save()
  //   })
  //   .catch(e => console.error(e))

  // return res.json(updateScorm)
  return res.json({});
});

router.get(
  "/current-user",
  passport.authenticate("cookie", { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);

router.post("/:model", (req, res) => {
  const model = req.params.model;
  return mongoose.connection.models[model]
    .create({})
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.get(
  "/:model/:id?",
  passport.authenticate("cookie", { session: false }),
  (req, res) => {
    const model = req.params.model;
    let fields = req.query.fields?.split(",") || [];
    const id = req.params.id;
    const params = req.get("Referrer")
      ? { ...url.parse(req.get("Referrer"), true).query }
      : {};
    const user = req.user;

    console.log(`GET ${model}/${id} ${fields}`);

    if (model == "contact") {
      return getContacts(req.user, id)
        .then(contacts => {
          return res.json(contacts);
        })
        .catch(err => {
          console.error(err);
          return res
            .status(err.status || HTTP_CODES.SYSTEM_ERROR)
            .json(err.message || err);
        });
    }

    if (model == "session") {
      fields = lodash([...fields, "trainers", "trainees"])
        .uniq()
        .value();
    }

    if (model == "message") {
      fields = lodash([
        ...fields,
        "sender",
        "destinee_user",
        "destinee_session"
      ])
        .uniq()
        .value();
    }

    if (model == "resource") {
      fields = lodash([...fields, "version"])
        .uniq()
        .value();
    }

    const queryModel = model == "loggedUser" ? "user" : model;
    const queryId = model == "loggedUser" ? req.user?._id || "INVALIDID" : id;

    buildQuery(queryModel, queryId, fields)
      .lean({ virtuals: true })
      .then(data => {
        // Force duplicate children
        data = JSON.parse(JSON.stringify(data));

        // Remove unrequired virtuals
        const requiredFields = lodash([...fields, "_id"])
          .map(f => f.split(".")[0])
          .uniq()
          .value();
        data = data.map(d => lodash.pick(d, requiredFields));

        if (id && data.length == 0) {
          throw new NotFoundError(`Can't find ${model}:${id}`);
        }
        return Promise.all(
          data.map(d => addComputedFields(user, params, d, model))
        );
      })
      .then(data => {
        return id
          ? Promise.resolve(data)
          : filterDataUser({ model, data, user: req.user });
      })
      .then(data => {
        if (["theme", "resource"].includes(model) && !id) {
          data = data.filter(t => t.name);
        }
        if (id && model == "resource" && data[0]?.status == RES_TO_COME) {
          throw new ForbiddenError(`Ressource non encore disponible`);
        }
        console.log(`GET ${model}/${id} ${fields}: data sent`);
        return res.json(data);
      })
      .catch(err => {
        console.error(err);
        return res.status(err.status || 500).json(err.message || err);
      });
  }
);

module.exports = router;
