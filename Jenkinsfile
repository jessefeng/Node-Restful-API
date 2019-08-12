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
                sh 'npm install' 
            }
        }
    }
    post {
        success {
            echo 'Built Successfully!'
            sh 'npm start'
        }
    }
}
