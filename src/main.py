from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

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
    # 临时测试用
    return file


if __name__ == '__main__':
    app.run(debug=True)