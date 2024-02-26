# -*- coding: utf-8 -*-
from flask import Flask, make_response, jsonify, render_template, request
import json
import AI_methods_20221020 as ai
import test6 
from sklearn.model_selection import train_test_split
import datetime
import pickle
import uuid
import os
import random
import matplotlib.pyplot as plt
from io import BytesIO
# from flask import Flask, make_response
import module_overrall as mo
import math
import ast
import base64
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import seaborn as sns
import pandas as pd
import numpy as np

app = Flask(__name__)  # 实例化app对象

testInfo = {}
DFMODEL_FOLDER = './DFmodel'
INPUTS_FOLDER = './Inputscsv'
RESULTS_FOLDER = './results' 

@app.route('/test_post/nn', methods=['GET', 'POST'])  # 路由
def test_post():
    # url = request.stream.read()

    # data = request.get_data()
    # data = json.loads(data)
    #
    # srxApi = data['srxApi']
    # operate = data['operate']
    # print(srxApi+"+"+operate)



    # get data from ajax in .js
    url = request.form['url']
    print("url: "+url)

    tmp = test6.qw(url)
    # ai.test_ai(url)

    # ai.test_print(url)

    testInfo['name'] = 'xiaoming'
    testInfo['age'] = '18' 
    
    return json.dumps(tmp)

@app.route('/testpost/nn', methods=['GET', 'POST'])  # 路由
def testpost():
    url = request.form['url']
    # print("url: "+url)
    # ai.test_ai(url)

    tmp=ai.acc(url) 
    return json.dumps(tmp)


@app.route('/testpost2/nn', methods=['GET', 'POST'])  # 路由
def testpost2():
    url = request.form['url']
    # print("url: "+url)
    # ai.test_ai(url)

    tmp=ai.acc2(url) 
    return json.dumps(tmp)

@app.route('/testpost3/nn', methods=['GET', 'POST'])  # 路由
def testpost3():
    url = request.form['url']
    # print("url: "+url)
    # ai.test_ai(url)

    tmp=ai.acc3(url) 
    return json.dumps(tmp)

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/index2')
def index2():
    return render_template('pnetedit.html')


@app.route('/index3')
def index3():
    return render_template('pnetedit2.html')

#24/1/10
# from flask import send_file
# @app.route('/download/<path:filename>', methods=['GET'])
# def download_file(filename):
#     file_path = 'output/outputdataset' + filename
#     return send_file(file_path, as_attachment=True)
from flask import send_from_directory
@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    directory = os.getcwd()  # 或者是文件存储的实际目录
    return send_from_directory(directory, filename, as_attachment=True)

@app.route('/generate_heatmap')
def generate_heatmap():
    # 生成随机数据
    data = []
    for i in range(6):
        row = [random.uniform(0, 1) for j in range(6)]
        data.append(row)
    # 创建热力图
    fig, ax = plt.subplots()
    heatmap = ax.imshow(data, cmap='YlOrRd', interpolation='nearest')
    ax.set_xticks(range(len(data)))
    ax.set_yticks(range(len(data)))
    ax.set_xticklabels(['A', 'B', 'C', 'D', 'E', 'F'])
    ax.set_yticklabels(['A', 'B', 'C', 'D', 'E', 'F'])
    ax.tick_params(axis='both', which='major', labelsize=14)
    # 将图像转换为字节数据流
    buf = BytesIO()
    fig.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    # 构建响应对象并返回
    response = make_response(buf.getvalue())
    response.headers['Content-Type'] = 'image/png'
    return response


@app.route('/generate_heatmap2')
def generate_heatmap2():
    TMP=test6.getTMP()

@app.route('/train', methods=['POST'])
def train_model():
    data = request.get_json()
    TMP = data['TMP']
    TGT = data['TGT']
    eleid = data['id']
    tgt_member = list(TGT.keys())[0]
    tgt_keys = list(TGT.keys())
    tgt_keys_str = ','.join(tgt_keys)
    tmp_keys = list(TMP.keys())
    tmp_keys_str = ','.join(tmp_keys)
    # 将字符串数据转换为 NumPy 数组并拼接特征矩阵
    X = None
    for key in TMP:
        feature_array = np.array(eval(TMP[key]))
        if X is None:
            X = feature_array
        else:
            X = np.hstack((X, feature_array))

    # 转换标签矩阵
    y = np.array(eval(list(TGT.values())[0]))

    # 划分数据集为训练集和测试集（70%训练，30%测试）
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=42)

    # 使用决策树分类器训练和预测
    a = ai.decision_tree_classifier(train_x, train_y, test_x, test_y)
    model_DTC = a[0]
    accuracy = a[1]
    current_time = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = uuid.uuid4()

    # 生成文件名
    filename = f"model/decision_tree_classifier_{current_time}_{unique_id}.pkl"

    # 保存模型到 "model" 文件夹
    with open(filename, "wb") as f:
        pickle.dump(model_DTC, f)

    return jsonify({"filename": filename, "accuracy": accuracy, "target": tgt_member, "id": eleid, "data": tmp_keys_str, "target": tgt_keys_str})

@app.route('/heatmap', methods=['POST'])
def heatmap():
    req_data = request.get_json()
    data = req_data['data']
    selected_columns = req_data['selected_columns']
    highcorr = req_data['highcorr']
    lowcorr = req_data['lowcorr']
    print(highcorr)
    print(lowcorr)
    parsed_data = {k: np.array(ast.literal_eval(v)).reshape(-1) for k, v in data.items()}
    df = pd.DataFrame(parsed_data)
    heatmap_data = calculate_heatmap(df)
    high_corr_pairs = get_high_correlations(df, selected_columns, highcorr)
    low_corr_pairs = get_low_correlations(df, selected_columns, lowcorr)
    return jsonify({'heatmap_image': heatmap_data, 'high_corr_pairs': high_corr_pairs, 'low_corr_pairs': low_corr_pairs})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = np.array(data['input_data']).reshape(1, -1)
    print('#######################################################################')
    print(input_data)
    filename = data['filename']

    with open(filename, 'rb') as f:
        model = pickle.load(f)

    prediction = model.predict(input_data)
    result = float(prediction[0])

    return jsonify({"result": result})

#2023/4/6
@app.route('/multimodeltrain', methods=['POST'])
def train_model_multiple():
    data = request.get_json()
    TMP = data['TMP']
    TGT = data['TGT']
    eleid = data['id']
    eletype = data['type']
    tgt_member = list(TGT.keys())[0]
    tgt_keys = list(TGT.keys())
    tgt_keys_str = ','.join(tgt_keys)
    tmp_keys = list(TMP.keys())
    tmp_keys_str = ','.join(tmp_keys)
    # 将字符串数据转换为 NumPy 数组并拼接特征矩阵
    X = None
    for key in TMP:
        feature_array = np.array(eval(TMP[key]))
        if X is None:
            X = feature_array
        else:
            X = np.hstack((X, feature_array))

    # 转换标签矩阵
    y = np.array(eval(list(TGT.values())[0]))

    # 划分数据集为训练集和测试集（70%训练，30%测试）
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=42)

    if eletype == 'DT-Operator':
        # 使用决策树分类器训练和预测
        a = ai.decision_tree_classifier(train_x, train_y, test_x, test_y)
        model = a[0]
        accuracy = a[1]
        print('DT')

    elif eletype == 'SVM-Operator':
        # 使用svm分类器训练和预测
        a = ai.svm_classifier(train_x, train_y, test_x, test_y)
        model = a[0]
        accuracy = a[1]
        print('SVM')

    elif eletype == 'RF-Operator':
        # 使用随机森林分类器训练和预测
        a = ai.random_forest_classifier(train_x, train_y, test_x, test_y)
        model = a[0]
        accuracy = a[1]
        print('RF')
    
    elif eletype == 'GBT-Operator':
        # 使用gbt分类器训练和预测
        a = ai.gradient_boosting_classifier(train_x, train_y, test_x, test_y)
        model = a[0]
        accuracy = a[1]
        print('GBT')

    else:
        # 使用决策树分类器训练和预测
        a = ai.decision_tree_classifier(train_x, train_y, test_x, test_y)
        model = a[0]
        accuracy = a[1]
        print('no model avilibal so we use DT')

    current_time = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = uuid.uuid4()

    # 生成文件名
    filename = f"model/{eletype}_{current_time}_{unique_id}.pkl"

    # 保存模型到 "model" 文件夹
    with open(filename, "wb") as f:
        pickle.dump(model, f)

    return jsonify({"filename": filename, "accuracy": accuracy, "target": tgt_member, "id": eleid, "data": tmp_keys_str, "target": tgt_keys_str})

#2023/5/12
@app.route('/VDTtrain', methods=['POST'])
def train_Visual_decision_treemodel():
    data = request.get_json()
    TMP = data['TMP']
    TGT = data['TGT']
    eleid = data['id']
    tgt_member = list(TGT.keys())[0]
    tgt_keys = list(TGT.keys())
    tgt_keys_str = ','.join(tgt_keys)
    tmp_keys = list(TMP.keys())
    tmp_keys_str = ','.join(tmp_keys)

    # 将字符串数据转换为 NumPy 数组并拼接特征矩阵
    X = None
    for key in TMP:
        feature_array = np.array(eval(TMP[key]))
        if X is None:
            X = feature_array
        else:
            X = np.hstack((X, feature_array))

    # 转换标签矩阵
    y = np.array(eval(list(TGT.values())[0]))

    # 划分数据集为训练集和测试集（70%训练，30%测试）
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=42)
    
    #获取classname和featurename
    class_names = [str(x) for x in np.unique(train_y)]
    feature_names = list(TMP.keys())
    
    print(class_names)
    print(feature_names)
    # 使用决策树分类器训练和预测
    model_DTC, accuracy, img_filename = visual_decision_tree_classifier(train_x, train_y, test_x, test_y, class_names, feature_names)
    
    # 生成文件名
    filename = f"model/decision_tree_classifier_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4()}.pkl"

    # 保存模型到 "model" 文件夹
    with open(filename, "wb") as f:
        pickle.dump(model_DTC, f)

    return jsonify({"filename": filename, "accuracy": accuracy, "target": tgt_member, "id": eleid, "data": tmp_keys_str, "target": tgt_keys_str, "img_filename": img_filename})

@app.route('/VDToptimize', methods=['POST'])
def change_Visual_decision_treemodel():
    data = request.get_json()
    TMP = data['TMP']
    TGT = data['TGT']
    eleid = data['id']
    tgt_member = list(TGT.keys())[0]
    tgt_keys = list(TGT.keys())
    tgt_keys_str = ','.join(tgt_keys)
    tmp_keys = list(TMP.keys())
    tmp_keys_str = ','.join(tmp_keys)

    # 将字符串数据转换为 NumPy 数组并拼接特征矩阵
    X = None
    for key in TMP:
        feature_array = np.array(eval(TMP[key]))
        if X is None:
            X = feature_array
        else:
            X = np.hstack((X, feature_array))

    # 转换标签矩阵
    y = np.array(eval(list(TGT.values())[0]))

    # 划分数据集为训练集和测试集（70%训练，30%测试）
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=42)
    
    #获取classname和featurename
    class_names = [str(x) for x in np.unique(train_y)]
    feature_names = list(TMP.keys())
    
    print(class_names)
    print(feature_names)
    # 使用决策树分类器训练和预测
    model_DTC, accuracy, img_filename = optimal_visual_decision_tree_classifier(X, y, class_names, feature_names)
    
    # 生成文件名
    filename = f"model/decision_tree_classifier_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4()}.pkl"

    # 保存模型到 "model" 文件夹
    with open(filename, "wb") as f:
        pickle.dump(model_DTC, f)

    return jsonify({"filename": filename, "accuracy": accuracy, "target": tgt_member, "id": eleid, "data": tmp_keys_str, "target": tgt_keys_str, "img_filename": img_filename})





# def calculate_heatmap(data):
#     figure = Figure()
#     axis = figure.add_subplot(1, 1, 1)
#     corr_data = data.corr()
#     sns.heatmap(corr_data, ax=axis, cmap='coolwarm', annot=True, fmt=".2f")

#     output = io.BytesIO()
#     FigureCanvas(figure).print_png(output)
#     return base64.b64encode(output.getvalue()).decode('utf-8')
#4/21
@app.route('/scatterplot', methods=['POST'])
def scatterplot():
    req_data = request.get_json()
    data = req_data['data']
    selected_columns = req_data['selected_columns']
    parsed_data = {k: np.array(ast.literal_eval(v)).reshape(-1) for k, v in data.items()}
    df = pd.DataFrame(parsed_data)
    scatterplot_matrix = generate_scatterplot_matrix(df, selected_columns)
    print('ok')
    return jsonify({'scatterplot_matrix': scatterplot_matrix})


@app.route('/leafvsacc', methods=['POST'])
def leafvsacc():
    accvsleaf = []
    r2vsleaf = []
    data = request.get_json()
    TMP = data['TMP']
    TGT = data['TGT']
    eleid = data['id']
    eletype = data['type']
    tgt_member = list(TGT.keys())[0]
    tgt_keys = list(TGT.keys())
    tgt_keys_str = ','.join(tgt_keys)
    tmp_keys = list(TMP.keys())
    tmp_keys_str = ','.join(tmp_keys)
    # 将字符串数据转换为 NumPy 数组并拼接特征矩阵
    X = None
    for key in TMP:
        feature_array = np.array(eval(TMP[key]))
        if X is None:
            X = feature_array
        else:
            X = np.hstack((X, feature_array))

    # 转换标签矩阵
    y = np.array(eval(list(TGT.values())[0]))

    # 划分数据集为训练集和测试集（70%训练，30%测试）
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=42)
    for i in range(2, 20):
        re = ai.Cdecision_tree_classifier(train_x, train_y, test_x, test_y, i)
        accvsleaf.append(re['accuracy'])

    for i in range(2, 20):
        re = ai.Cdecision_tree_regressor(train_x, train_y, test_x, test_y, i)
        r2vsleaf.append(re['accuracy'])

    xvalue = range(2,20)

    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    plt.figure(figsize=(10,6))  
    plt.plot(xvalue, accvsleaf, marker='o')  # Plot the data
    plt.title('Accuracy vs. Leaf Nodes')  # Title of the plot
    plt.xlabel('Number of Leaf Nodes')  # Label for x-axis
    plt.ylabel('Accuracy')  # Label for y-axis
    plt.grid(True)  # Show grid lines (optional)
    plt.xticks(xvalue)
    uuid_str = str(uuid.uuid4())
    #  filename = f"model/decision_tree_classifier_{current_time}_{unique_id}.pkl"
    filename = f'static/leafnode_vs_acc/{eleid}_{uuid_str}.png'
    plt.savefig(filename, dpi = 600)  # Save the figure as a png file
    print(eleid)
    suggestion = maxleaffitclassifier(accvsleaf)
    print(suggestion)
    nodevsacc = filename


    plt.figure(figsize=(10,6))  
    plt.plot(xvalue, r2vsleaf, marker='o')  
    plt.title('Accuracy vs. Leaf Nodes')  
    plt.xlabel('Number of Leaf Nodes')  
    plt.ylabel('Accuracy')  
    plt.grid(True) 
    plt.xticks(xvalue)
    uuid_str = str(uuid.uuid4())
    #  filename = f"model/decision_tree_classifier_{current_time}_{unique_id}.pkl"
    filename = f'static/leafnode_vs_r2/{eleid}_{uuid_str}.png'
    plt.savefig(filename, dpi = 600)  # Save the figure as a png file
    nodevsr2 = filename

    return jsonify({"filename": filename, "target": tgt_member, "id": eleid, "data": tmp_keys_str, "target": tgt_keys_str , "suggestion": suggestion, "nodevsacc": nodevsacc, "nodevsr2": nodevsr2})



#5/12
@app.route('/get_vdtimage', methods=['POST'])
def get_image():
    import os
    req_data = request.get_json()
    image_path = req_data['image_path']
    
    if os.path.exists(image_path):
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return jsonify({'image_base64_string': encoded_string})
    else:
        return jsonify({'error': 'Image not found'}), 404


#11/22
@app.route('/uploaddfm', methods=['POST'])
def upload_file():
    # 检查是否收到文件
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # 如果用户没有选择文件，浏览器会提交一个空文件
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # 确保DFmodel文件夹存在
        os.makedirs(DFMODEL_FOLDER, exist_ok=True)

        # 构建文件的完整路径
        file_path = os.path.join(DFMODEL_FOLDER, file.filename)

        # 保存文件
        file.save(file_path)

        # 处理文件
        with open(file_path, 'r') as f:
            data = json.load(f)
            AIlist, inputlist, outputlist, edgelist = process_json_file(data)
        
        # 返回数据处理结果
        return jsonify({
            'AIlist': AIlist,
            'inputlist': inputlist,
            'outputlist': outputlist,
            'edgelist': edgelist,
            'filePath': file_path
        })
    
@app.route('/uploadips', methods=['POST'])
def upload_ipscsv():
    # 检查是否收到文件
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # 如果用户没有选择文件，浏览器会提交一个空文件
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # 确保DFmodel文件夹存在
        os.makedirs(INPUTS_FOLDER, exist_ok=True)

        # 构建文件的完整路径
        file_path = os.path.join(INPUTS_FOLDER, file.filename)

        # 保存文件
        file.save(file_path)
        
        # 返回数据处理结果
        return jsonify({
            'filePath': file_path
        })


@app.route('/predictips', methods=['POST'])
def predictips():
    # 确保 results 文件夹存在
    os.makedirs(RESULTS_FOLDER, exist_ok=True)
    print('ok1')
    # 获取前端发送的数据
    ipsurl = request.json.get('ipsurl')
    dfmurl = request.json.get('dfmurl')

    # 从 dfmurl 读取 JSON 文件
    try:
        with open(dfmurl, 'r') as f:
            data = json.load(f)
        AIlist, _, _, _ = process_json_file(data)
    except (FileNotFoundError, KeyError, json.JSONDecodeError):
        return jsonify({'error': 'JSON file not found, invalid format, or processing error'})


    print('ok2')
    # 从 ipsurl 读取 CSV 文件
    try:
        data = pd.read_csv(ipsurl)
    except FileNotFoundError:
        return jsonify({'error': 'CSV file not found'})
    
    print('ok3')

    results_paths = {}
    for ai in AIlist:
        order_string = ai['order']
        model_path = ai['model_name']
        print(model_path)
        print(f'当前工作目录: {os.getcwd()}')
         # 将 order 字符串转换为列表
        try:
            order = json.loads(order_string)
        except json.JSONDecodeError:
            print(f'解析 order 字段时出错: {order_string}')
            continue

        print(f'order: {order}')
        print(f'当前工作目录: {os.getcwd()}')

        missing_columns = [col for col in order if col not in data.columns]
        if missing_columns:
            print(f'在 CSV 文件中找不到以下列名: {missing_columns}')
            continue

        try:
            ordered_data = data[order]
            print('ok4')
        except KeyError:
            print('err4')
            continue

        # 加载模型
        if os.path.exists(model_path):
            print('ok5')
            with open(model_path, "rb") as f:
                model = pickle.load(f)
        else:
            continue

        # 进行预测
        predictions = model.predict(ordered_data)
        print(predictions)
        print('ok6')
        # 保存预测结果到 CSV 文件
        result_filename = f'result_{ai["id"]}_{uuid.uuid4()}.csv'
        result_path = os.path.join(RESULTS_FOLDER, result_filename)
        pd.DataFrame(predictions, columns=['Prediction']).to_csv(result_path, index=False)

        # 存储结果文件路径
        results_paths[ai['id']] = result_path

    # 返回结果文件路径
    return jsonify(results_paths)

@app.route('/overrallpredictmodule', methods=['POST'])
def overrall_module_predict():
    file_name = request.json.get('file_name')
    file_path = request.json.get('dfmurl')
    csv_path = request.json.get('ipsurl')
    print(file_name)
    print(file_path)
    print(csv_path)
    
    df, file_root = overrall_predict_module(csv_path, file_path, file_name)
    data_html = df.to_html()
    return jsonify({"data": data_html, "file_root": file_root})

@app.route('/predictsigle', methods=['POST'])
def predict_sigle():
    order = request.json.get('order')
    model = request.json.get('model')
    csv_path = request.json.get('ipsurl')
    clumn_name = request.json.get('clumn_name')
    aiid = request.json.get('aiid')
  
    df = predict_single_model_byips(csv_path, model, order, clumn_name)
    print("df:")
    print(df)
    df2 = df[[clumn_name]].copy()
    # 将 DataFrame 转换为字典
    data_dict = df2.to_dict(orient='list')  
    json_str = json.dumps(data_dict) 
    return jsonify({"data": json_str, "aiid": aiid})

#集成学习output
@app.route('/overrallpredictmodule2', methods=['POST'])
def overrall_module_predict2():
    file_name = request.json.get('file_name')
    file_path = request.json.get('dfmurl')
    csv_path = request.json.get('ipsurl')
    clumn_name = request.json.get('clumn_name')
    aiid = request.json.get('aiid')
    print(file_name)
    print(file_path)
    print(csv_path)
    
    df, file_root= overrall_predict_module(csv_path, file_path, file_name)
    #df2为df中的clumn_name列的值为预测结果
    #输出dataframe df的所有列名
    print("列名:"+df.columns)

    print("target"+clumn_name)
    df2 = df[[clumn_name]].copy()
    print(df2)
    # 将 DataFrame 转换为字典
    data_dict = df2.to_dict(orient='list')  
    json_str = json.dumps(data_dict) 
    return jsonify({"data": json_str, "aiid": aiid})


def generate_scatterplot_matrix(data, cols_to_change):
    sns.set(style="ticks")

    # Create a PairGrid with custom axis label colors
    # g = sns.PairGrid(data)
    # g = g.map_diag(plt.hist)
    # g = g.map_offdiag(plt.scatter)
    g = sns.pairplot(data)
    # Change axis label colors for specified columns to red
    for ax in g.axes.flatten():
        x_label = ax.get_xlabel()
        y_label = ax.get_ylabel()
        if x_label in cols_to_change:
            ax.xaxis.label.set_color('red')
        if y_label in cols_to_change:
            ax.yaxis.label.set_color('red')

    # Save the figure as a base64 string
    output = io.BytesIO()
    num_columns = len(data.columns)
    dpi = 100 + 50 * num_columns
    if(dpi > 600):
        dpi = 600

    g.fig.savefig(output, format='png' , dpi=dpi)
    output.seek(0)
    return base64.b64encode(output.getvalue()).decode('utf-8')

# Visual decision Tree Classifier
def visual_decision_tree_classifier(train_x, train_y, test_x, test_y, class_names, feature_names):
    import matplotlib
    matplotlib.use('Agg')
    from sklearn import tree
    import matplotlib.pyplot as plt
    import uuid


    model = tree.DecisionTreeClassifier(max_depth=10, min_samples_split=10, min_samples_leaf=10)
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    total_nodes = model.tree_.node_count
    n_leaf_nodes = model.tree_.n_leaves  # Number of leaf nodes
    n_internal_nodes = total_nodes - n_leaf_nodes
    total_edges = n_internal_nodes * 2
    dpi=total_edges*20+200
    if dpi > 1200:
        dpi = 1200
    elif dpi < 300:
        dpi = 300
    plt.figure(figsize=(15,10))
    tree.plot_tree(model, 
                   filled=True, 
                   rounded=True, 
                   class_names=class_names, 
                   feature_names=feature_names)
    
    # Generate unique filename
    unique_id = uuid.uuid4()
    img_filename = f"DTimg/decision_tree_{unique_id}.png"
    
    # Save the figure
    plt.savefig(img_filename, format='png', dpi=dpi)
    plt.close()
    
    return model, accuracy, img_filename

# optimize Visual decision Tree Classifier
def optimal_visual_decision_tree_classifier(X, y, class_names, feature_names):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import uuid
    import numpy as np
    import pandas as pd
    from sklearn.model_selection import cross_val_score, train_test_split
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.tree import DecisionTreeRegressor

    max_leaf_nodes_range = range(2, 61)
    average_scores_classifier = []
    average_scores_regressor = []

    # Decision Tree Classifier
    for max_leaf in max_leaf_nodes_range:
        model = DecisionTreeClassifier(max_leaf_nodes=max_leaf)
        scores = cross_val_score(model, X, y, cv=5)
        average_score = scores.mean()
        print(average_score)
        average_scores_classifier.append(average_score)
        # print(f'Decision Tree Classifier: max_leaf_nodes={max_leaf}, average cross validation score={average_score}')

    # Decision Tree Regressor
    for max_leaf in max_leaf_nodes_range:
        model = DecisionTreeRegressor(max_leaf_nodes=max_leaf)
        scores = cross_val_score(model, X, y, cv=5)
        average_score = scores.mean()
        
        average_scores_regressor.append(average_score)
        # print(f'Decision Tree Regressor: max_leaf_nodes={max_leaf}, average cross validation score={average_score}')

    # Finding the optimal max_leaf_nodes
    optimal_max_leaf_classifier = max_leaf_nodes_range[average_scores_classifier.index(max(average_scores_classifier))]
    optimal_max_leaf_regressor = max_leaf_nodes_range[average_scores_regressor.index(max(average_scores_regressor))]

    print(f'Optimal max_leaf_nodes for Decision Tree Classifier: {optimal_max_leaf_classifier}')
    print(f'Optimal max_leaf_nodes for Decision Tree Regressor: {optimal_max_leaf_regressor}')
    from sklearn import tree
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=420)
    model = tree.DecisionTreeClassifier(max_leaf_nodes=optimal_max_leaf_classifier)
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    total_nodes = model.tree_.node_count
    n_leaf_nodes = model.tree_.n_leaves  # Number of leaf nodes
    n_internal_nodes = total_nodes - n_leaf_nodes
    total_edges = n_internal_nodes * 2
    dpi=total_edges*20+200
    if dpi > 1200:
        dpi = 1200
    elif dpi < 300:
        dpi = 300
    plt.figure(figsize=(15,10))
    tree.plot_tree(model, 
                   filled=True, 
                   rounded=True, 
                   class_names=class_names, 
                   feature_names=feature_names)
    
    # Generate unique filename
    unique_id = uuid.uuid4()
    img_filename = f"DTimg/decision_tree_{unique_id}.png"
    
    # Save the figure
    plt.savefig(img_filename, format='png', dpi=dpi)
    plt.close()
    
    return model, accuracy, img_filename


def gsm(data):
    sns.pairplot(data)
    plt.show()

def calculate_heatmap(data):
    num_columns = len(data.columns)
    dpi = 100 + 50 * math.log(num_columns)
    if(dpi > 400):
        dpi = 400

    # dpi = 100 + 50 * num_columns
    figure = Figure(dpi=dpi)
    axis = figure.add_subplot(1, 1, 1)
    corr_data = data.corr()
    sns.heatmap(corr_data, ax=axis, cmap='coolwarm', annot=True, fmt=".2f")

    output = io.BytesIO()
    FigureCanvas(figure).print_png(output)
    return base64.b64encode(output.getvalue()).decode('utf-8')

def get_high_correlations(data, selected_columns, threshold):
    corr_matrix = data.corr().abs()
    high_corr_pairs = []
    
    for col in selected_columns:
        for i, corr_value in corr_matrix[col].items():
            if corr_value >= threshold and i != col:
                high_corr_pairs.append((col, i, corr_value))
    
    return high_corr_pairs

def get_low_correlations(data, selected_columns, threshold):
    corr_matrix = data.corr().abs()
    low_corr_pairs = []
    
    for col in selected_columns:
        for i, corr_value in corr_matrix[col].items():
            if corr_value <= threshold and i != col:
                low_corr_pairs.append((col, i, corr_value))
    
    return low_corr_pairs

def get_high_correlationspy2(data, selected_columns, threshold):
    corr_matrix = data.corr().abs()
    high_corr_pairs = []
    
    for col in selected_columns:
        for i, corr_value in corr_matrix[col].iteritems():
            if corr_value >= threshold and i != col:
                high_corr_pairs.append((col, i, corr_value))
    
    return high_corr_pairs

def get_low_correlationspy2(data, selected_columns, threshold):
    corr_matrix = data.corr().abs()
    low_corr_pairs = []
    
    for col in selected_columns:
        for i, corr_value in corr_matrix[col].iteritems():
            if corr_value <= threshold and i != col:
                low_corr_pairs.append((col, i, corr_value))
    
    return low_corr_pairs


def maxleaffitclassifier(accclassifier):
    v=0
    v2=0
    for i in range(1, len(accclassifier)):
        print(accclassifier[i]-accclassifier[i-1])
        if v == 3 or v2 == 2:
            if v == 3:
                return 'low increacement stop at:'+ str(i-2)

            if v2 == 2:
                return '<0 stop at:'+str(i-1)
        
        if accclassifier[i]-accclassifier[i-1] < 0.02:
            v+=1
        else:
            v=0

        if accclassifier[i]-accclassifier[i-1] <= 0:
            v2+=1
        else:
            v2=0

    return 'no stop:'+str(i+2)
   
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
    

import pandas as pd
import os
import pickle

def process_and_predict(AIlist, csv_file_path):
    # 读取 CSV 文件
    try:
        data = pd.read_csv(csv_file_path)
    except FileNotFoundError:
        print(f"CSV file not found: {csv_file_path}")
        return

    for ai in AIlist:
        # 从 ai 元素中获取 order 和 model_name
        order = ai['order']
        model_path = ai['model_name']

        # 重排列列以匹配 order
        try:
            ordered_data = data[order]
        except KeyError:
            print(f"Some columns from 'order' not found in the CSV file: {csv_file_path}")
            continue

        # 加载模型
        if os.path.exists(model_path):
            with open(model_path, "rb") as f:
                model = pickle.load(f)
        else:
            print(f"Model file not found: {model_path}")
            continue

        # 进行预测
        predictions = model.predict(ordered_data)
        print(f"Predictions for {ai['id']}: {predictions}")

# 24/1/10

def overrall_predict_module(csv_path, file_path, file_name):
    #file_path：dfm文件路径
    #csv_path：ips文件路径
    with open(file_path, 'r') as f:
            data = json.load(f)
            AIlist, inputlist, outputlist, edgelist = process_json_file(data)
    df = mo.overrall_predict(csv_path, AIlist)
    df2 = df
    file_root = 'output\\outputdataset'+ file_name +'.csv'
    df2.to_csv(file_root, index=False, encoding='utf-8-sig')
    return df, file_root

def predict_single_model_byips(csv_path, model, order, clumn_name):
    #csv_path：ips文件路径
    #model_path：模型文件路径
    df = mo.single_model_predict(order, csv_path, model, clumn_name)
    return df
    


if __name__ == '__main__':
    app.run(host='0.0.0.0',  # 任何ip都可以访问
            port=7777,  # 端口
            debug=True
            )
