Purpose: Instructions to place project under Git and GitHub version control.

Git Guidelines: usually you want to get a project under version control if it has or will have more than just basic
book examples and you want to 1) ensure its backed up and 2) you can track changes to the project over time  3) I am sure there are other valid reasons, but these seen the most critical to me.  you dont need to get everything under version control, basically just the important stuff.
	Git- is housed on your local machine.  once project is under git control it will be physically moved from eclipse workspace to the git directory
	Github- this backs up the project online to your github account and is closely linked tothe git local presence.

1) Git
  1) See the Eclipse Help window (minimized top right) and gor to bookmarks.  I bookmarked the git instructions for future ref.  This Assumes a project is created in your Eclipse workspace.  Most of prelim/user stuff already setup, go about 1/3 the way down to Create Repository section. the slides are a little dated, but you can see the basic stuff.  below is a summary
  2) Select Project, then File/Team/Share Project
  3) Select Git, you will want to Create a Respository (browse) under C:\users\Scott\git\{project name}.  your selected project name should show also up in bottom portion.  This path follows convention of projects already setup.  Note if you cancelled out and came back you will see your added selection in the pulldown list of directories
  4) hit finish- this setup Git & moved the project over to the git directory.
  5) in Project Explorer you will now see a 'decorator' to the left '[{project name} master] of the project itself. but files are not under vc yet
  6) Click on files(s) right click Team/Commit, use Select All, add a commit note in sub-window and commit.  you will see them listed in the git tab at the bottom window

2) Initial Github {master]
  1) once git is setup locally you can log onto your account online at github.com and add the project there.  in help bookmark go down to GitHub Tutorial portion.
  2) in Git hub select new repository.  Add project namecreate a new repository under your account.
    you can add a [root]readme.md file if you dont already have one.
  3) In 'Quick Setup' -on next webpage- select http (or https) button and copy the link provided next to the button.  you will add this to your local version of Eclipse.
      SSH can be used but since my stuff is public and not under a private repository (the pay version) then SSH transmission isnt going to make much of a difference.  See gitHub tutorial for details.
  4) In Eclipse right click project then Team/Remote/Push.
  5) subwindow comes up.  1st pg- Paste/validate the remote URL, hit Next.  name will default to 'origin' keep this as is. and add a Name in the box below like 'remoteStore' or 'origin'.  this is the name that will be displayed in GitHub.
  6) In this window: in Source Ref pick '[branch] Master' from pulldown.
  7) in Destination pick 'HEAD' from pulldown
  8) Click 'Add All branches spec'.  this will populate the window below and 'Finish' button appears.  Click Finish'
  9) Click 'ok' in next window.  Project is now setup in GitHub.


3) Subsequent Updates to Github.
  1) Standard practice (as I read it) reccomends that subsequent updates be pushed up to the remote (gitHub)as a branch off the master.  You can then (in a team environment) Compare & Pull Request into master for subsequent deployment to production.  As of Jul16 I am going to use the step 4 'add Branch' steps below.  I am still working to get familiar with Git/Github interactions though, so this may change.  
  2) To create a branch.  In Eclispe project right click Team/Push Branch.  then name branch in two places- 1st page and next page.  it defaults to master on 2nd page.  then hit next and finish.
  3) in a review envronment you would then review nad pull branch into master version when ready to deploy.
  4) Once you create the first branch the commit and push function works without issue (w/o a branch there was some funkyness on attempting remote push, didnt write down the exact issues) 


4) Add Branch, Pull and Push requests.  Single developer/one project and a group of developers/one project are different animals.
  1) Single developer method.  Local Git creates a branch off the master, then you can push it to Remote/Github, as that same new branch.  Intending to pull branches by chapter & merge to keep changes organized. So process = branch/create/test/merge w/ pushes to remote at intervals to have a backup.  This is also my current understanding of how a project would normally be managed in git/github as enhancements are made to a website or app.
  	1) Branch-Team/Switch To/New Branch. This updates Local Git. and in local instance changes from Master to Branch.  See changed 		decorator next to project.  Edit the neccesary files and test.
  	2) Push- Team/Push Branch to update Remote/GitHub.  can be interim updates w/ or w/o testing.
  	3) Merge- Team/Merge.  Once your mods are tested and work. 
  		-Local-In Eclipse Team/Switch To/Master branch.  (the one you want to merge changes into).
  		-Local-Team/Merge and pick the branch with the changes to incorporate and click Finish
  		-Local-Your tested changes are now part of the master branch. 
  		-Remote- Team/Push Branch.  select your 'origin' branch and click ok. validate in Github after. 
  	4) Synchonize-[pending].  thinking this is how a local project branch updates the remote master to indicate its merged (vs a Merge by a qualified project owner on a team project).  but may be wrong here.  reading Ry. git manual for more info.  This method is in contrast to more of a single Github project being worked by a team as noted below in item 2.  Right now I am the only one working my Github project.
  	
  2) Team developer method.  This for contributing to anothers github project (or part of a team)  A Fork request is initiated in Github and downloaded to local instance.  Once edited- in local IDE and Git- you Team/Push  I am mostly just doing Commit and Push functions, since I am the only one creating on project.  Pull/Push function is really for teams w multiple developers.  There is a lot more to learn about this,  However for now I am concentraing on single developer projects so I have a basic understanding of Git and GitHub functions.
  
5) GitHub- old branches.
In git hub you can delete unused/no longer used branches in project header 'branches' link. then select the branch and click the small trash can icon on the right.  I think this is what I will do with Fast-Forward chapter branches, once changes are merged back into Master on local site and then Master is pushed to Origin on remote.  Still reading up on this though...