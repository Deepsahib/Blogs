import ImageKit from "imagekit";
import env from "./env.js";

const imagekit = new ImageKit({
    publicKey:env.imagekitpublic,
    privateKey:env.imagekitprivate,
    urlEndpoint:env.imagekiturl
});

export default imagekit;