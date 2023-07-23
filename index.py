import sys
import os
import datetime

print("Hello World")
print(f"timestamp: {datetime.datetime.now()}")
print(f"python version: {sys.version}")
print(f"current working directory: {os.getcwd()}")
print(f"current user: {os.getlogin()}")
