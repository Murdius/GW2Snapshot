import copy


# Compare inventory snapshots
def compare_inventory(list1, list2):
    delta_list = copy.deepcopy(list2)
    for item1 in list1:
        flag = 0
        for item2 in delta_list:
            if item2['id'] == item1['id']:
                item2['count'] = item2['count'] - item1['count']
                flag = 1
                break
        if flag == 0:
            delta_list.append({'count': -item1['count'], 'id': item1['id']})
    return delta_list


# Compare wallet snapshots
def compare_wallet(list1, list2):
    delta_list = copy.deepcopy(list2)
    for item1 in list1:
        flag = 0
        for item2 in delta_list:
            if item2['id'] == item1['id']:
                item2['value'] = item2['value'] - item1['value']
                flag = 1
                break
        if flag == 0:
            delta_list.append({'value': -item1['value'], 'id': item1['id']})
    return delta_list


# Compress list of items have duplicate id
def compress_list(list1):
    compressed_list = []
    for item in list1:
        flag = 0
        for item2 in compressed_list:
            if item['id'] == item2['id']:
                item2['count'] += item['count']
                flag = 1
        if flag == 0:
            compressed_list.append(item)
    return compressed_list


def combine_list(list1, list2):
    combined_list = copy.deepcopy(list2)
    for item1 in list1:
        flag = 0
        for item2 in combined_list:
            if item2['id'] == item1['id']:
                item2['count'] = item2['count'] + item1['count']
                flag = 1
                break
        if flag == 0:
            combined_list.append({'id': item1['id'], 'count': item1['count']})
    return combined_list


def filter_list(unfiltered_list):
    filtered_list = []
    for item in unfiltered_list:
        filtered_list.append({'id': item['id'], 'count': item['count']})
    return filtered_list


# Remove all items with count: 0 in list
def remove_zero_count(list1):
    non_zero_list = []
    for item in list1:
        if item['count'] != 0:
            non_zero_list.append(item)
    return non_zero_list


def remove_zero_value(list1):
    non_zero_list = []
    for item in list1:
        if item['value'] != 0:
            non_zero_list.append(item)
    return non_zero_list


def merge_list(a, b, c, d):
    e = a + b + c + d
    e = copy.deepcopy(e)
    return e
