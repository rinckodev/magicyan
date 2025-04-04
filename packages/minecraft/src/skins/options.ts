export interface SkinRenderCameraCoords {
    x:  string | number;
    y:  string | number;
    z:  string | number;
}

export interface SkinRenderCameraOptions {
    /**
     * - Defines the coordinates of the camera's position.
     * - Default Value: Value changes based on render type.
     * - default: `{ x: 11.92, y: 15.81, z: -29.71 }`
     * - marching: `{ x: 21.96, y: 11.12, z: -28.25 }`
     * - walking: `{ x: 23.86, y: 22.67, z: -26.65 }`
     * - crouching: `{ x: 16.29, y: 21.82, z: -34.03 }`
     * - crossed: `{ x: 17.65, y: 21.37, z: -24.47 }`
     * - criss_cross: `{ x: 11.92, y: 15.81, z: -29.71 }`
     * - ultimate: `{ x: 15, y: 22, z: -35 }`
     * - isometric: `{ x: -64, y: 60.26, z: -64 }`
     * - head: `{ x: 9.97, y: 19.64, z: -20.98 }`
     * - cheering: `{ x: 14.88, y: 28.91, z: -30.19 }`
     * - relaxing: `{ x: -16.04, y: 16.57, z: -27.5 }`
     * - trudging: `{ x: 16.04, y: 16.57, z: -27.5 }`
     * - cowering: `{ x: -14.62, y: 15.93, z: -23.63 }`
     * - pointing: `{ x: -3.41, y: 18.3, z: -30.8 }`
     * - lunging: `{ x: -0.41, y: 24.7, z: -34.73 }`
     * - dungeons: `{ x: 15.26, y: 19.62, z: -27.58 }`
     * - facepalm: `{ x: 3.11, y: 17.56, z: -31.13 }`
     */
    cameraPosition: SkinRenderCameraCoords
    /**
     * - Defines the coordinates of the camera's focal point. You can use this parameter to focus on specific details or areas in your render.
     * - Default Value: Value changes based on render type.
     * - default: `{ x: 0.31, y: 18.09, z: 1.32 }`
     * - marching: `{ x: 0.03, y: 16.12, z: -0.33 }`
     * - walking: `{ x: -1.49, y: 17.46, z: 2.16 }`
     * - crouching: `{ x: -1.83, y: 16.04, z: -0.29 }`
     * - crossed: `{ x: -0.35, y: 16.83, z: 0.44 }`
     * - criss_cross: `{ x: 0.31, y: 18.09, z: 1.32 }`
     * - ultimate: `{ x: 0, y: 16, z: 0 }`
     * - isometric: `{ x: 4, y: 12, z: 4 }`
     * - head: `{ x: -0.01, y: 27.96, z: -0.32 }`
     * - cheering: `{ x: -0.19, y: 17.08, z: 3.46 }`
     * - relaxing: `{ x: -1.05, y: 6.89, z: 0.5 }`
     * - trudging: `{ x: 0.03, y: 16.12, z: -0.33 }`
     * - cowering: `{ x: 1.38, y: 12.29, z: -0.37 }`
     * - pointing: `{ x: -0.08, y: 19.08, z: 2.23 }`
     * - lunging: `{ x: 0.45, y: 20.78, z: 3.79 }`
     * - dungeons: `{ x: -1.06, y: 17.6, z: 1.26 }`
     * - facepalm: `{ x: 0.55, y: 20.96, z: 1.8 }`
     */
    cameraFocalPoint: SkinRenderCameraCoords
    /**
     * - This allows the user to change the width of the image using an integer. Disables auto-crop when defined. (Value cannot be larger than 3840 pixels.)
     * - Default 3D Value: `1159`
     * - Default 2D Value: `800`
     * 
    */
    cameraWidth: number
    /**
    * - This allows the user to change the height of the image using an integer. Disables auto-crop when defined. (Value cannot be larger than 3840 pixels.)
    * - Default 3D Value: `1159`
    * - Default 2D Value: `Will always match scale of cameraWidth.`
    */
    cameraHeight: number
    /**
     * - A float value that changes the scale of the render. (Value cannot be 0 or lower, only works with 3D renders.)
     * - Default Value: `1`
     */
    renderScale: number;
    /**
     * - An integer that allows the user to set the Field of View (FOV) of the camera. (Tip: Blockbench default is 45.)
     * - Default Value: `75`
     */
    cameraFOV: number
    /**
     * - This is a boolean value that provides the user with the option to switch between using an orthographic camera or not. It grants you the freedom to choose the camera style that best suits your creative vision.
     * - Default Value: Value changes based on render type.
     */
    isometric: boolean
    /**
     * - This is a boolean value that provides the user with the option to enable a small, white, Minecraft Dungeons-inspired highlight.
     * - Default Value: `false`
     */
    borderHighlight: boolean;
    /**
     * - This is a color value that allows the user to change the color of the borderHighlight. (Only works when the borderHighlight parameter is enabled.)
     * - Default Value: `ffffff`
     */
    borderHighlightColor: string;
    /**
     * - A integer value that provides the user the ability to adjust the size of the borderHighlight. (Only works when the borderHighlight parameter is enabled.)
     * - Default Value: `3`
     */
    borderHighlightRadius: number;
    /**
     * - This is a boolean value that provides the user with the option to enable a simple drop shadow on the render.
     * - Default Value: `false`
     */
    dropShadow: boolean;
}

export interface SkinRenderLightingOptions {
    /**
     * - Defines the coordinates of the directional light used in the scene.
     * - Default Value: Value changes based on render type.
     * - All renders: `{ x: -10, y: 10, z: -10 }`
     * - relaxing: `{ x: 10, y: 10, z: -10 }`
     * - cowering: `{ x: 10, y: 10, z: -10 }`
     */
    dirLightPos: SkinRenderCameraCoords
    /**
     * - This value allows the user to set the color of the directional light used in the scene. Allows hexadecimal color values, such as: "b300ff."
     * - Default Value: `ffffff`
     */
    dirLightColor: string;
    /**
     * - This numerical value acts as an adjustment to the global lighting setup's original light level.
     * - Default Value: `0`
     */
    dirLightIntensity:  number
    /** 
     * - This value allows the user to set the color of the global light used in the scene. Allows hexadecimal color values, such as: "0040ff."
     * - Default Value: `ffffff`
     */
    globalLightColor: string
    /**
     * - This numerical value acts as an adjustment to the global lighting setup's original light level.
     * - Default Value: `0`
     */
    globalLightIntensity:  number
}

export type ModelType = "slim" | "wide";
export interface SkinRenderModelOptions {
    /**
     * - This parameter allows the user to define a skin image to use using a url.
     * - Default Value: Value changes based on player name/uuid.
     */
    skinUrl: string;
    /**
     * - Must be used with skinUrl, this parameter allows you to choose whether the geometry for your model is slim or wide.
     * - Default Value: `wide`
     */
    skinType: ModelType;
    /**
     * - A link to the model the API will use in the case of a players skin using the wide format. (Must be used with the custom render type.)
     * - Default Value: Value changes based on render type.
     */
    wideModel: string;
    /**
     * - A link to the model the API will use in the case of a players skin using the slim format. (Must be used with the custom render type.)
     * - Default Value: Value changes based on render type.
     */
    slimModel: string;
    /**
     * - This parameter allows the user to define a OBJ model using a url that can be used as a prop.
     * - Default Value: Value changes based on render type.
     */
    propModel: string;
    /**
     * - Must be used with propModel, this parameter allows the user to choose the texture applied to the prop.
     * - Default Value: Value changes based on render type.
     */
    propTexture: string;
    /**
     * - Must be used with the custom render type, this parameter allows the user to choose a custom OBJ cape model to be applied to the scene. When left blank no cape will apply.
     * - Default Value: Value changes based on render type.
     */
    capeModel: string;
    /**
     * - Can be defined on any 3D render, this allows the user to define a custom cape texture to apply to the cape model. When left blank the players default cape will apply.
     * - Default Value: Value changes based on player name/uuid.
     */
    capeTexture: string;
    /**
     * - Allows the user to choose whether capes can render on their renders.
     * - Default Value: `true`
     */
    capeEnabled: boolean;
    /**
     * - Allows the user to choose whether or not shading is enabled for the prop model.
     * - [MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) when true, [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial) when false.
     * - Default Value: `true`
     */
    propModelShading: boolean;
    /**
     * - Allows the user to choose whether or not shading is enabled for the cape model.
     * - [MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) when true, [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial) when false.
     * - Default Value: `true`
     */
    capeModelShading: boolean;
    /**
     * - Allows the user to choose whether or not shading is enabled for the player model.
     * - [MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) when true, [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial) when false.
     * - Default Value: `true`
     */
    playerModelShading: boolean;
}