# waifurudor.de

It's like foxrudor.de for anime girls, but worse

## How to use

Open the web site up and see the predefined anime girls, or define your own tags
like:

https://waifurudor.de/?tags=tohsaka_rin,-feet,-underwear,rating:safe

## Server Install

Clone the repo to where ever you will be hosting this and run the following
command to install the dependencies.

```sh
npm i
```

Now that the dependencies are taken care of you can verify it runs with
`npm start` in the root directory of the project. If it tells you it is
listening on a port you're probably good to go.

## Running as a service

I don't know anything so I spent some time (10 minutes) creating the provided
sample systemd service file.

The user in the file needs accesss to the assets directory under
`./waifurudor.de/src/public/` so the """app""" can pull images from Danbooru.

## Nginx

Yeah I set up a .conf file for this for my test instance but it sucks and you
could probably do better so I won't share it just know it is possible to
actually run this as a website.

### What's next

I have some small improvements in mind before I give up and call this "done".
