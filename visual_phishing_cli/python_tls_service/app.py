from flask import Flask, request, jsonify
import tlsh

app = Flask(__name__)

@app.route('/api/hash', methods=['POST'])
def generate_tlsh():
    data = request.get_json()
    if not data or 'input_string' not in data:
        return jsonify({'error': 'Missing input_string'}), 400

    input_string = data['input_string']
    try:
        input_bytes = input_string.encode('utf-8')
        hash_value = tlsh.hash(input_bytes)
        return jsonify({'hash': hash_value})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/diff', methods=['POST'])
def tlsh_diff():
    data = request.get_json()
    if not data or 'hash1' not in data or 'hash2' not in data:
        return jsonify({'error': 'Missing hash1 or hash2'}), 400

    hash1 = data['hash1']
    hash2 = data['hash2']
    try:
        diff_score = tlsh.diff(hash1, hash2)
        return jsonify({'diff': diff_score})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
