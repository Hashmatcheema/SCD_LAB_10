pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.split('/').last() ?: 'unknown'
                    // Handle "default" as main branch
                    if (branchName == 'default') {
                        branchName = 'main'
                    }
                    echo "=========================================="
                    echo "Checking out branch: ${branchName}"
                    echo "Build #${env.BUILD_NUMBER}"
                    echo "=========================================="
                }
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                dir('Task2') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Parallel Test Execution') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        echo 'Running unit tests...'
                        dir('Task2') {
                            bat 'npm test'
                        }
                    }
                }
                stage('Linting') {
                    steps {
                        echo 'Running linting...'
                        dir('Task2') {
                            bat 'npm run lint'
                        }
                    }
                }
            }
        }
        
        stage('Conditional Deployment Simulation') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.split('/').last() ?: 'unknown'
                    // Handle "default" as main branch (Jenkins multi-branch sometimes uses this)
                    if (branchName == 'default') {
                        branchName = 'main'
                    }
                    
                    if (branchName == 'main') {
                        echo '=========================================='
                        echo 'Deployed to Production Environment (main branch)'
                        echo 'Production deployment simulation completed'
                        echo '=========================================='
                    } else if (branchName == 'dev') {
                        echo '=========================================='
                        echo 'Deployed to Staging Environment (dev branch)'
                        echo 'Staging deployment simulation completed'
                        echo '=========================================='
                    } else {
                        echo '=========================================='
                        echo "Feature branch detected (${branchName}) – Deployment Skipped."
                        echo '=========================================='
                    }
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build artifacts...'
                script {
                    // Create build output directory
                    bat '''
                        if not exist build mkdir build
                        cd Task2
                        copy converter.js ..\\build\\
                        copy test.js ..\\build\\
                        copy package.json ..\\build\\
                        copy README.md ..\\build\\
                        cd ..
                    '''
                    // Create zip file using PowerShell
                    powershell '''
                        $buildDir = "build"
                        $zipFile = "build-artifacts-${env:BRANCH_NAME}.zip"
                        if (Test-Path $zipFile) { Remove-Item $zipFile }
                        Compress-Archive -Path $buildDir\\* -DestinationPath $zipFile -Force
                        Write-Host "Created archive: $zipFile"
                    '''
                }
                // Archive the zip file as Jenkins artifact
                archiveArtifacts artifacts: "build-artifacts-*.zip", fingerprint: true
            }
        }
    }
    
    post {
        success {
            script {
                def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.split('/').last() ?: 'unknown'
                if (branchName == 'default') {
                    branchName = 'main'
                }
                def timestamp = new Date().format("yyyy-MM-dd HH:mm:ss")
                echo "=========================================="
                echo "Build #${env.BUILD_NUMBER} on branch ${branchName} completed successfully at ${timestamp}"
                echo "=========================================="
            }
        }
        failure {
            script {
                def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.split('/').last() ?: 'unknown'
                if (branchName == 'default') {
                    branchName = 'main'
                }
                echo "Build #${env.BUILD_NUMBER} on branch ${branchName} failed!"
            }
        }
        always {
            echo 'Multi-branch pipeline execution completed.'
        }
    }
}

