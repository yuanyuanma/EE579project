# Read in a WAV and find the freq's
#!/usr/bin/python
import pyaudio
import wave
import numpy as np
import sys
import math

chunk = 2048
path = str(sys.argv[1])
# open up a wave
wf = wave.open(path, 'rb')
nchannal = wf.getnchannels()
swidth = wf.getsampwidth() 
RATE = wf.getframerate()
comtype = wf.getcomptype()
# use a Blackman window
window = np.blackman(chunk)
# open stream
p = pyaudio.PyAudio()
stream = p.open(format =
                p.get_format_from_width(wf.getsampwidth()),
                channels=wf.getnchannels(),
                rate = RATE,
                output = True)

# read some data
Data = wf.readframes(chunk)
#mono track music
data= reduce(lambda a,b: a+b,[Data[i:i+2] for i in range(0,len(Data),4)])
# play stream and find the frequency of each chunk
while len(data) == chunk*swidth:
    # write data out to the audio stream
    stream.write(Data)
    # unpack the data and times by the hamming window
    indata = np.array(wave.struct.unpack("%dh"%(len(data)/swidth),\
                                         data))*window
    # Take the fft and square each value
    fftData=abs(np.fft.rfft(indata))**2
    # find the maximum
    amp=math.sqrt(max(fftData[1:]))
    which = fftData[1:].argmax() + 1
    # use quadratic interpolation around the max
    if which != len(fftData)-1:
        y0,y1,y2 = np.log(fftData[which-1:which+2:])
        x1 = (y2 - y0) * .5 / (2 * y1 - y2 - y0)
        # find the frequency and output it
        thefreq = (which+x1)*RATE/chunk
        #print str(thefreq)
        print str(thefreq)+" "+str(amp) #frequency and amp
        
    else:
        thefreq = which*RATE/chunk
        #print str(thefreq)
        print str(thefreq)+" "+str(amp) #frequency and amp

        
    # read some more data
    Data = wf.readframes(chunk)
    data= reduce(lambda a,b: a+b,[Data[i:i+2] for i in range(0,len(Data),4)])

if data:
    stream.write(data)
stream.close()
p.terminate()