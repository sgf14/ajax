Eclipse 'ajax' project usage:
1) Goal: want to develop ajax enabled interactive website w/ connection to mysql db. Eclipse Ajax project is a testbed.
Read e file used to keep track of current working version and general notes for tracking and remebering where I left off.  
Using Mylyn task tracking also for sgfdb_dev project as a whole.  Ajax part is taking some time to learn.

  This folder holds a couple ajax templates designed for integration of javascript, jquery, php and mysqli db.  jqLoad,get and
Post.  in that order.  Running into issues getting ajax function to work with jq and php.

2) Model: 
Client side: html/js/jq front end
Server side: php/mysql w/ ajax and json as the interactive glue to tie the two together.


3) End State: Get basic function working in ajax project, then deploy this to sgfdb_dev project and load on InMotion webserver and 
  add functionality over time.  Deploy same project on my own webserver once raspberryPi setup.

4) Tracking: This is a work in progress 
4.1) Nov15- started with jqLoad- SAJ book, on top of WebApp and LPMJ books.  Got jqLoad read only version up and working.  Got stuck dont know enough about jq library yet.
4.2) Nov15-Apr16- Read Sams Angular JS, Java Script and jQuery book (SAJ) chaps 1-15 to become more familiar w/ jq.  In addition to PHP Cookbook.  Moved on to fleshing out jqget.  Apr 16.
4.3) 04/24/16- partial interactivity created with indexAjaxTabGetJSON.html series, but not working yet.

5) Reference:
Starting PHP localhost.
1) start XAMPP server, Apache, Mysql, filezilla
2) open web browser and enter index...html file to test after updating appropriate 