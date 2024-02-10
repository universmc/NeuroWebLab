import os
import subprocess

def create_project_structure():
    project_root = "/universmc/"

    if not os.path.exists(project_root):
        os.makedirs(project_root)

    subdirectories = ["backend", "frontend", "docs", "data", "src"]
    for subdir in subdirectories:
        subdir_path = os.path.join(project_root, subdir)
        if not os.path.exists(subdir_path):
            os.makedirs(subdir_path)

    makefile_path = os.path.join(project_root, "Makefile")
    if not os.path.exists(makefile_path):
        subprocess.run(["vi", makefile_path])

if __name__ == "__main__":
    create_project_structure()
