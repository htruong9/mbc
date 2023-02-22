from decimal import Decimal

def parse_boolean(str):
    if str == u'true':
        return True
    if str == u'false':
        return False

def is_false(str):
    if str == u'false':
        return True
    else:
        return False

def decimal_sum(a, b):
    return Decimal(a) + Decimal(b)