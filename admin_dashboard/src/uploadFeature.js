/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'CREATE' && resource === 'equipment/all') {
        // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.pictures is not an array, but single object
        if (params.data.logo && params.data.logo.length) {
            const myFile = params.data.logo;
            if ( !myFile.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(myFile) )
                .then( (picture64) => ({
                    src: picture64,
                    title: `${myFile.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        myFile: transformedMyFile
                    }
                }));
        }
    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;
