# EE579project

This is a project mainly for EE579 mobile and wireless network design and lab.The project is called visual symphony.
Getting frequency and amplitude from beautiful music, and pass those value to the smart device,which is laid on the 6LowPan network.
Running mainly three command line, you can get the program work.

Firstly,you need install the nodejs and devicejs,and get devicejs server running:
reference: 
https://drive.google.com/a/usc.edu/folderview?id=0B4qUk05dWYtSSjBlV0NsTWxfc3c&usp=sharing#
https://docs.google.com/document/d/1LjfR77bNGvBa6Bc_Si43qP2eCcGQ8aP18aKYvfWDz2E/edit

For filament based on Devicejs, running:
devicejs run controller.js

For frequency-getting process, running:
python detector.py hello1.wav > ~/data.txt


