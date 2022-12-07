import React from "react";
import lodash from "lodash";

const normalize = str => {
  str = str
    ? str
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    : "";
  return str;
};

const isOtherSource = (element, dataSourceId) => {
  if (
    element.props.dynamicContainer &&
    element.props.dataSourceId &&
    element.props.dataSourceId !== dataSourceId
  ) {
    return true;
  }
};
const setRecurseDataSource = (element, dataSource, dataSourceId, level = 0) => {
  if (React.Children.count(element.props.children) === 0) {
    return [];
  } else {
    return React.Children.map(element.props.children, function(child) {
      //if (child.props === undefined || (child.props.dataSourceId && child.props.dataSourceId!=dataSourceId)) {
      if (child.props === undefined) {
        return child;
      } else if (React.Children.count(child.props.children) === 0) {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(child, {});
        }
        return React.cloneElement(child, { dataSource });
      } else {
        if (isOtherSource(child, dataSourceId)) {
          return React.cloneElement(
            child,
            {},
            setRecurseDataSource(child, dataSource, dataSourceId, level + 1)
          );
        }
        return React.cloneElement(
          child,
          { dataSource },
          setRecurseDataSource(child, dataSource, dataSourceId, level + 1)
        );
      }
    });
  }
};
const withDynamicContainer = Component => {
  const FILTER_ATTRIBUTES = ["code", "name", "short_name", "description"];

  const internal = props => {
    if (!props.dataSource) {
      return null;
    }
    const firstChild = React.Children.toArray(props.children)[0];
    let orgData = props.dataSource;
    if (props.attribute) {
      orgData = lodash.get(orgData, props.attribute);
    }
    orgData = orgData || [];
    if (props.contextFilter) {
      const contextIds = props.contextFilter.map(o => o._id.toString());
      orgData = orgData.filter(d => contextIds.includes(d._id));
    }
    if (props.textFilter && props.textFilter) {
      const filterValue = props.textFilter;
      const regExp = new RegExp(normalize(filterValue).trim(), "i");
      orgData = orgData.filter(d =>
        FILTER_ATTRIBUTES.some(att => regExp.test(normalize(d[att])))
      );
    }
    let data = [];
    try {
      data = orgData.slice(0, parseInt(props?.limit) || undefined);
    } catch (err) {
      console.error(
        `Container ${props.id} can not slice ${JSON.stringify(orgData)}:${err}`
      );
    }
    return (
      <Component {...lodash.omit(props, ["children"])}>
        {data.map(d => (
          <>
            {React.cloneElement(
              firstChild,
              { dataSource: d },
              setRecurseDataSource(firstChild, d, props.dataSourceId)
            )}
          </>
        ))}
      </Component>
    );
  };

  return internal;
};

export default withDynamicContainer;
