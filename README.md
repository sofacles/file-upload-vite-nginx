# My question

Hello, I have a question about the `publicDir` in vite.config. In [my repo](https://github.com/sofacles/file-upload-vite-nginx) have a folder structure like this:

```
-my-app
    |-- client
        |-- vite.config.ts
    |-- server // this is an Express app that does some image resizing and saves to a local folder
        |--public // I have some existing images in here, but I want users to be able to upload new images too.

```

vite.config.ts has `publicDir: "../server/public",

I'm being fast and loose with the images here. I want to upload them straight to a folder that the express server is serving as static content.
My uploads work fine on my dev server. It also works when I run `vite build` and deploy the apps another server. But if I use multer to resize the images:

```
const storage = multer.diskStorage({
    destination: function (req: any, file, cb) {
        cb(null, `${process.cwd()}/public`); //this breaks, because the "public" folder has already been kind of "siezed" by the vite build.
        //cb(null, `${process.cwd()}/sandbox`); //this works, but it doesn't end up being visible on the client
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.imageName}.jpg`);
    },
});
```

By "breaks", I mean that after this middleware runs, a `req.file` object will no longer be available in the POST handler.  
If I switch which line is commented out, then I can save to the public folder, but since I've already built, it won't be put into the public assets folder in the client.

A sturdy solution might include putting the images onto a queue running in the background that resizes the image and copies them to `client/dist`, or maybe put just put my images
in S3 or something, but is there a way to make vite continue to use the `public`` folder in node?

# changes to make upload also work on the server:

change the form action: get rid of ` localhost:8888``
 `sudo systemctl restart nginx`
