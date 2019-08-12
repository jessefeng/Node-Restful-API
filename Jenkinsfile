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
        stage('Start') {
            steps {
                sh 'npm start'
            }
        }
    }
}
