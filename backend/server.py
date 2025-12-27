from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pymysql
import os
import logging
from pathlib import Path
import uuid
from datetime import datetime
from contextlib import contextmanager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Flask app setup
app = Flask(__name__)

# CORS configuration
CORS(app, 
     resources={r"/api/*": {"origins": "*"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# MySQL connection configuration
MYSQL_CONFIG = {
    'host': os.environ.get('MYSQL_HOST', 'localhost'),
    'user': os.environ.get('MYSQL_USER', 'root'),
    'password': os.environ.get('MYSQL_PASSWORD', 'root123'),
    'database': os.environ.get('DB_NAME', 'test_database'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

# Database connection context manager
@contextmanager
def get_db_connection():
    connection = pymysql.connect(**MYSQL_CONFIG)
    try:
        yield connection
    finally:
        connection.close()

# Routes
@app.route('/api/', methods=['GET'])
def root():
    return jsonify({"message": "Hello World"})

@app.route('/api/status', methods=['POST'])
def create_status_check():
    try:
        data = request.get_json()
        client_name = data.get('client_name')
        
        if not client_name:
            return jsonify({"error": "client_name is required"}), 400
        
        # Generate ID and timestamp
        status_id = str(uuid.uuid4())
        timestamp = datetime.utcnow()
        
        # Insert into database
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO status_checks (id, client_name, timestamp) VALUES (%s, %s, %s)"
                cursor.execute(sql, (status_id, client_name, timestamp))
            connection.commit()
        
        # Return the created object
        return jsonify({
            "id": status_id,
            "client_name": client_name,
            "timestamp": timestamp.isoformat()
        }), 201
        
    except Exception as e:
        app.logger.error(f"Error creating status check: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/status', methods=['GET'])
def get_status_checks():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                sql = "SELECT id, client_name, timestamp FROM status_checks ORDER BY timestamp DESC"
                cursor.execute(sql)
                results = cursor.fetchall()
        
        # Convert datetime to ISO format
        for row in results:
            if isinstance(row['timestamp'], datetime):
                row['timestamp'] = row['timestamp'].isoformat()
        
        return jsonify(results), 200
        
    except Exception as e:
        app.logger.error(f"Error getting status checks: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/status/<status_id>', methods=['DELETE'])
def delete_status_check(status_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                # Check if record exists
                sql_check = "SELECT id FROM status_checks WHERE id = %s"
                cursor.execute(sql_check, (status_id,))
                result = cursor.fetchone()
                
                if not result:
                    return jsonify({"error": "Status check not found"}), 404
                
                # Delete the record
                sql_delete = "DELETE FROM status_checks WHERE id = %s"
                cursor.execute(sql_delete, (status_id,))
            connection.commit()
        
        return jsonify({"message": "Status check deleted successfully", "id": status_id}), 200
        
    except Exception as e:
        app.logger.error(f"Error deleting status check: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=False)
