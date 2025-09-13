from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import shutil
import sys


app = Flask(__name__)
CORS(app)

@app.route('/ncm-to-mp3', methods=['POST'])
def ncm_to_mp3_endpoint():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not file.filename.endswith('.ncm'):
        return jsonify({'error': 'Invalid file type'}), 400

    try:
        mp3_data = ncm_to_mp3(file)
        return send_file(
            mp3_data,
            mimetype='audio/mpeg',
            as_attachment=True,
            download_name=file.filename.rsplit('.', 1)[0] + '.mp3'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def ncm_to_mp3(file):
    tmp_dir = './tmp'
    os.makedirs(tmp_dir, exist_ok=True)
    # 清空 tmp 目录
    for filename in os.listdir(tmp_dir):
        file_path = os.path.join(tmp_dir, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    save_path = os.path.join(tmp_dir, file.filename)
    file.save(save_path)
    # 用当前 Python 解释器调用转换脚本
    os.system(f'"{sys.executable}" ./ncm_converter.py {tmp_dir} {tmp_dir}')
    mp3_path = os.path.join(tmp_dir, file.filename.rsplit('.', 1)[0] + '.mp3')
    return mp3_path


if __name__ == '__main__':
    app.run(debug=True)