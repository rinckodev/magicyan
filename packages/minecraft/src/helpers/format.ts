import _ from "lodash";

export const convertKeysToCamelCase = (obj: any): any => {
    if (_.isArray(obj)) {
        return obj.map(convertKeysToCamelCase);
    } else if (_.isObject(obj)) {
        return _.mapKeys(
            _.mapValues(obj, convertKeysToCamelCase),
            (__, key) => _.camelCase(key)
        );
    }
    return obj;
};