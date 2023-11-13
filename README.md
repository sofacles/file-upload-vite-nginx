# Things I've done to make upload also work on the server:

change the form action: get rid of localhost:8888
sudo systemctl restart nginx (still doesn't work, but I do see the OK message after I post)
rebuilt the server app and scp'd it over (there were NO changes real changes to the server code. I added a Logger.info call, but that's it. I don't see how that could have helped.)
