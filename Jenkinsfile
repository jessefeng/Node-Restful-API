pipeline {
    agent any
    tools {
        nodejs 'Node Latest'
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install pm2 -g'
                sh 'npm install' 
            }
        }
    }
    post {
        success {
            echo 'Built Successfully!'
            sh 'pm2 start ./bin/www --port 3000'
        }
    }
}
