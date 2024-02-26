import eel

@eel.expose
def your_function(a, b):
    str=a+b
    test_process(str)


def test_process(str):
    eel .system_sends_massage2(str)   

if __name__ == '__main__':
    eel.init("")
    eel.start('pnetedit.html')