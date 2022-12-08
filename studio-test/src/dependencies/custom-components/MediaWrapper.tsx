//@ts-nocheck
import React from "react";

export const getExtension = (filename: string) =>
  filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
  filename;

export const mediaWrapper = ({
  src,
  version,
  htmlHeight,
  htmlWidth,
  ...props
}: {
  src: string;
  version?: string;
  htmlHeight?: string;
  htmlWidth?: string;
}) => {
  const mediaId = props?.dataSource?._id;

  const document = {
    width: htmlWidth || "100%",
    height: htmlHeight || "100%"
  };

  const isVideoProvider = (src: string) => {
    /* Detect YouTube and Vimeo url videos */
    const regex = /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/g;
    return regex.test(src);
  };

  const ext = !isVideoProvider(src) ? getExtension(src) : "html";

  switch (ext) {
    case "mp4":
    case "webm":
      return (
        <video
          width={document.width}
          controls
          preload="none"
          poster="images/videocover.png"
        >
          <source src={src} type={`video/${ext}`} />
        </video>
      );
    case "pdf":
      return (
        <object
          type="application/pdf"
          data={src}
          role={"document"}
          width={document.width}
          height={document.height}
        ></object>
      );
    case "doc":
    case "docx":
    case "xls":
    case "xlsx":
      return (
        <iframe
          title={src}
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${src}`}
          width={htmlWidth}
          height={htmlHeight}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      );
    case "txt":
    case "html":
      const scormSettings = {
        autocommit: true,
        autocommitSeconds: 30,
        dataCommitFormat: "json",
        commitRequestDataType: "application/json;charset=UTF-8",
        autoProgress: false,
        logLevel: 1,
        mastery_override: false,
        lmsCommitUrl: "/myAlfred/api/studio/scormupdate"
      };

      if (version) {
        const kindOfVersion = parseFloat(version);

        if (kindOfVersion > 1.2) {
          //@ts-ignore
          window.API_1484_11 = new Scorm2004API(scormSettings);

          /* Test datas  */
          let dataFromLms = {
            // this data is passed from the LMS
            cmi: {
              entry: mediaId,
              learner_id: "@jcputney",
              learner_name: "Jonathan Putney",
              scaled_passing_score: 0.5,
              session_time: "PT23M17.6S",
              suspend_data:
                "2b3q60708090a0b0c0d0e0f0g0h0i0~2g1~2c11001c12~2110101201112012120131201412015120161201712018120191201a1201b1201c12Uh$Eal10000000000001^v_player.5blaPRuhGqT.6EtR5cS99ds1^1^00von3FWt6121011b101021010110000000"
            }
          };

          //@ts-ignore
          window.API_1484_11.loadFromJSON(dataFromLms, "");

          let unloaded = false;
          function unloadHandler() {
            if (!unloaded && !window.API_1484_11.isTerminated()) {
              window.API_1484_11.SetValue("cmi.exit", "suspend"); //Set exit to whatever is needed
              window.API_1484_11.Commit(""); //save all data that has already been set
              window.API_1484_11.Terminate(""); //close the SCORM API connection properly
              unloaded = true;
              return false;
            }
            return false;
          }

          window.onbeforeunload = unloadHandler;
          window.onunload = unloadHandler;
        } else {
          //@ts-ignore

          let dataFromLms = {
            // this data is passed from the LMS
            cmi: {
              core: {
                entry: "ab-initio",
                student_id: "@rick",
                student_name: "Richard Pasquiou"
              }
            }
          };

          window.API = new Scorm12API(scormSettings);
          window.API.loadFromJSON(dataFromLms, "");
        }
      }

      return (
        <iframe
          loading="lazy"
          title={src}
          src={src}
          width={htmlWidth}
          height={htmlHeight}
          allowFullScreen
        ></iframe>
      );
    default:
      return (
        <img
          loading="lazy"
          src={src}
          width={document.width}
          height={document.height}
          alt=""
        />
      );
  }
};
