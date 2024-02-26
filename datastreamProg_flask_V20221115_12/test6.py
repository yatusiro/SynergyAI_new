import pandas as pd
import seaborn as sns      
import numpy as np    
import matplotlib.pyplot as plt 
import json
import os
# collect data
data = {
    'x': [45, 37, 42, 35, 39],
    'y': [38, 31, 26, 28, 33],
    'z': [10, 15, 17, 21, 12],
    'a': [10, 15, 17, 21, 12]
}
data['c'] = [10, 15, 17, 21, 12]
clum = ['x', 'y', 'z' ,'a' ]
clum = clum.append('c')
print(clum)

def qw(str):
    a=[]
    sttt=str
    strlist = sttt.split('@%&')
    for value in strlist:
        a.append(value)

    name = []
    data = []
    a[0] = a[0].strip(',')
    strlist = a[0].split(',')
    for value in strlist:
        name.append(value)

    a[1] = a[1].strip('#')
    strlist = a[1].split('#')
    for value in strlist:
        data.append(value)

    for a in range(0,len(data)):
        data[a]=data[a].replace('[','')
        data[a]=data[a].replace(']','')

    TMP={}

    for a in range(0,len(data)):
        tmp = list(data[a].split(','))
        for b in range(0,len(tmp)):
            tmp[b] = float(tmp[b])
        TMP[name[a]]=tmp
      
    dataframe = pd.DataFrame(TMP, columns = name)
    print("Dataframe is : ")
    matrix = dataframe.corr()
    st = matrix.to_json()
    #HTML
    rt = matrix.to_html()
    print(type(rt))
    print(rt)
    html = matrix.to_html()
    print(html)
    file=open('temphtml2.html','w')
    file.write(rt)
    file.close()
    os.system('temphtml2.html')
    #HTML
    print("Correlation matrix is : ")
    heatmap_plot=sns.heatmap(matrix,center=0,cmap='YlGnBu')   
    plt.show()
    return st
    
def getTMP(str):
    a=[]
    sttt=str
    strlist = sttt.split('@%&')
    for value in strlist:
        a.append(value)

    name = []
    data = []
    a[0] = a[0].strip(',')
    strlist = a[0].split(',')
    for value in strlist:
        name.append(value)

    a[1] = a[1].strip('#')
    strlist = a[1].split('#')
    for value in strlist:
        data.append(value)

    for a in range(0,len(data)):
        data[a]=data[a].replace('[','')
        data[a]=data[a].replace(']','')

    TMP={}

    for a in range(0,len(data)):
        tmp = list(data[a].split(','))
        for b in range(0,len(tmp)):
            tmp[b] = float(tmp[b])
        TMP[name[a]]=tmp
    
    return TMP


# form dataframe

#print(dataframe)

# form correlation matrix


