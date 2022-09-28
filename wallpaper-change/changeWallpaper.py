
##   instal python 3 and apscheduler 3.3.1

from glob import glob
import os, sys, requests

print('Is it ', sys.argv[1])

def getWallpaper(url, name):
    res = requests.get(url)
    res.raise_for_status()
    imageFile = open(os.path.join('wall', name ),'wb')
    for chunk in res.iter_content(100000):
        imageFile.write(chunk)
    imageFile.close()

def setWallpaper(pic):
    home = os.getenv('HOME')
    path = home + '/Desktop/'
    desktop_path = '/usr/bin/gsettings set org.gnome.desktop.background picture-uri '
    
    print('inside setWallpaper')
    os.chdir(path+'wall')
    file = 'file://' + path + 'wall/' + pic
    print(file)
    os.system(desktop_path+file)
    os.chdir(path)


def get():
    print('getttt')
    
def set():
    print('sett')

if __name__ == "__main__":
    globals()[sys.argv[1]]
    # globals()[sys.argv[1]](sys.argv[2])
    
    # url = sys.argv[1]
    # name = sys.argv[2]
    # getWallpaper(url, name)
