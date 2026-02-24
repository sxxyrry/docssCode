"""
目录树生成器 - 支持排除模式
用法: python tree.py [目录路径] [--exclude PATTERN ...]
示例: python tree.py /path/to/dir --exclude "*.pyc" "__pycache__" "*.tmp"
"""

import os
import sys
import argparse
import fnmatch

SYMBOLS = {
    'branch': '├── ',
    'leaf': '└── ',
    'indent': '│   ',
    'space': '    ',
    'dir_suffix': '/',
}

def should_exclude(name, exclude_patterns):
    """判断名称是否匹配任一排除模式"""
    for pattern in exclude_patterns:
        if fnmatch.fnmatch(name, pattern):
            return True
    return False

def generate_tree(dir_path, prefix='', is_last=True, output=None, exclude_patterns=None):
    if exclude_patterns is None:
        exclude_patterns = []
    if output is None:
        output = []

    base_name = os.path.basename(os.path.normpath(dir_path))
    dir_display = base_name + SYMBOLS['dir_suffix']

    if prefix == '':
        output.append(dir_display)
    else:
        connector = SYMBOLS['leaf'] if is_last else SYMBOLS['branch']
        output.append(prefix + connector + dir_display)

    sub_prefix = prefix + (SYMBOLS['space'] if is_last else SYMBOLS['indent'])

    try:
        items = sorted(os.listdir(dir_path))
    except PermissionError:
        output.append(sub_prefix + SYMBOLS['branch'] + '[权限不足]')
        return output

    # 先过滤掉需要排除的条目（根据基本名称）
    filtered_items = []
    for item in items:
        if not should_exclude(item, exclude_patterns):
            filtered_items.append(item)

    # 分离目录和文件，保证目录优先显示
    dirs = []
    files = []
    for item in filtered_items:
        full = os.path.join(dir_path, item)
        if os.path.isdir(full):
            dirs.append(item)
        else:
            files.append(item)

    sorted_items = dirs + files

    for idx, item in enumerate(sorted_items):
        last_item = (idx == len(sorted_items) - 1)
        full_path = os.path.join(dir_path, item)
        if os.path.isdir(full_path):
            generate_tree(full_path, sub_prefix, last_item, output, exclude_patterns)
        else:
            connector = SYMBOLS['leaf'] if last_item else SYMBOLS['branch']
            output.append(sub_prefix + connector + item)

    return output

def main():
    parser = argparse.ArgumentParser(description='生成目录树，支持排除模式')
    parser.add_argument('root', nargs='?', default='.', help='要遍历的目录（默认为当前目录）')
    parser.add_argument('-x', '--exclude', action='append', default=[],
                        help='排除匹配的名称（支持通配符，可多次使用）')
    args = parser.parse_args()

    root = args.root
    exclude_patterns = args.exclude

    if not os.path.isdir(root):
        print(f'错误："{root}" 不是一个有效的目录', file=sys.stderr)
        sys.exit(1)

    lines = generate_tree(root, exclude_patterns=exclude_patterns)
    for line in lines:
        print(line)

if __name__ == '__main__':
    main()
