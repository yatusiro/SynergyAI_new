from flask import Flask, render_template, request, jsonify
import json
import os
import pandas as pd
import numpy as np
import csv
import pickle
import ast
import numpy as np


# file_path = 'DFmodel\data_test_overrall.json'
# csv_path = 'inputscsv\\inputdataset.csv'
# df = pd.read_csv(csv_path, encoding='utf-8')

def process_json_file(data):
    # Lists to store the data
    AIlist = []
    inputlist = []
    outputlist = []
    edgelist = []

    # Process each object in the data array
    for item in data:
        # Extracting the data property
        item_data = item.get('data', {})
        id = item_data.get('id', '')

        # Remove 'csv_data' key if it exists
        item_data.pop('csv_data', None)
        item_data.pop('label', None)
        item_data.pop('parent', None)

        # Check the prefix of the ID and add to the appropriate list
        if id.startswith('AI'):
            AIlist.append(item_data)
        elif id.startswith('s'):
            inputlist.append(item_data)
        elif id.startswith('o'):
            outputlist.append(item_data)
        elif 'source' in item_data and 'target' in item_data:  # Checking for edges
            edgelist.append(item_data)


    return AIlist, inputlist, outputlist, edgelist

def getinput(id, edgelist):
    input = []
    for edge in edgelist:
        if edge['target'] == id:
            input.append(edge['source'])
    return input

def getmodelorder(id, AIlist):

    def getmodel(id, AIlist):
        for AI in AIlist:
            if AI['id'] == id:
                return AI['model_name']
    
    def getorder(id, AIlist):
        for AI in AIlist:
            if AI['id'] == id:
                return AI['order']
            
    model = getmodel(id, AIlist)
    order = getorder(id, AIlist)
    return model, order


def getsimdata_predict(id, dataframe, AIlist):
    model, orderst = getmodelorder(id, AIlist)
    print('this is:'+id)
    print(id+'order is:'+orderst)
    print('dataframe has:'+str(dataframe.columns))
    # 将字符串转换为列表
    order = ast.literal_eval(orderst)
    # order = ai['order']
    # model_path = ai['model_name']

    # 重排列列以匹配 order
    try:
        ordered_data = dataframe[order]
    except KeyError:
        print(f"Some columns from 'order' not found in the CSV file: {dataframe.columns}")
        return False


    # 加载模型
    if os.path.exists(model):
        with open(model, "rb") as f:
            model = pickle.load(f)
        print('model loaded')
    else:
        print(f"Model file not found: {model}")
        return False


    X = ordered_data.to_numpy()
    print(X)
    # 进行预测
    predictions = model.predict(X)
    print('predictions:')
    print(predictions)
    return predictions


def overrall_predict(csv_path, AIlist):
    dataframe = pd.read_csv(csv_path, encoding='utf-8')
    # dataframeresult = pd.DataFrame()
    ready = 0
    AIlisttmp = AIlist
    while ready == 0:
        length = len(AIlisttmp)
        for AI in AIlisttmp:
            try:
                predictions = getsimdata_predict(AI['id'], dataframe, AIlist)
                # print('predictions check:')
                # print(predictions)
                # 检查 predictions 列表中第一个元素的类型
                print('predictions type:')
                # ！！！如果没有这句会触发全是false的bug
                type(predictions[0])
                # if False in predictions:
                #     print('false')
                #     continue

                print(AI['id'])
                clumn_name = AI['csv_lier']
                #将预测结果写入dataframe
                dataframe[clumn_name] = predictions
                #将已经预测的AI从AIlisttmp中删除
                AIlisttmp.remove(AI)
                print('ok')

            except:
                continue

        if length == len(AIlisttmp):
            print("dataflow not valid")    
            break
        
        if len(AIlisttmp) == 0:
            ready = 1
            break
    return dataframe
    

# with open(file_path, 'r') as f:
#             data = json.load(f)
#             AIlist, inputlist, outputlist, edgelist = process_json_file(data)

# for i in AIlist: 
#     print(i['id'])

# df2 = pd.read_csv('inputscsv\\outputdataset.csv', encoding='utf-8')
# prediction = getsimdata_predict('AI-127', df2, AIlist)
# print(prediction)



# df = overrall_predict(csv_path, AIlist)
# print(df)
# df.to_csv('output\\outputdataset.csv', index=False, encoding='utf-8-sig')

# print(inputlist)
# print(edgelist)
# print(outputlist)

def single_model_predict(forder, csv_path, model, clumn_name):
    dataframe = pd.read_csv(csv_path, encoding='utf-8')
    # 重排列列以匹配 order
    print('order:')
    print(forder)
    #转化为列表
    order = json.loads(forder)
    #输出dataframe的列名
    print('dataframe has:')
    print(dataframe.columns)
    try:
        ordered_data = dataframe[order]
    except KeyError:
        print(f"Some columns from 'order' not found in the CSV file: {dataframe.columns}")
        return False


    # 加载模型
    if os.path.exists(model):
        with open(model, "rb") as f:
            model = pickle.load(f)
        print('model loaded')
    else:
        print(f"Model file not found: {model}")
        return False


    X = ordered_data.to_numpy()
    print(X)
    # 进行预测
    predictions = model.predict(X)
    print('Prediction:')
    print(predictions)
    dataframe[clumn_name] = predictions
    return dataframe