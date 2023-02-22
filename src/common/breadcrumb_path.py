# DEFINE: route is child of path, a path can contains many route

class BreadcrumbRoute:
    def __init__(self, title: str = '', url: str = '', icon: str = None) -> None:
        self.title = title
        self.url = url
        self.icon = icon
        
class BreadcrumbPath:
    def __init__(self) -> None:
        self.path = []

    def add(self, title: str = '', url: str = '', icon = None):
        self.path.append( BreadcrumbRoute(title, url, icon) )
    def end(self, title: str = '', url: str = '', icon = None):
        self.end = BreadcrumbRoute(title, url, icon)
