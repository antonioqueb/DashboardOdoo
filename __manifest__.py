{
    'name': 'tobaccometricspro',
    'version': '1.0.0.1', 
    'category': 'Administration',
    'summary': 'Herramientas de análisis y visualización para la industria tabacalera.',
    'author': 'Antonio Queb',
    'website': 'https://www.fingrow.co',
    'depends': ['base', 'web'],
    'assets': {
        'web.assets_backend': [
            'kpi_dashboard_fingrow/static/src/js/*.js',
        ]
    },
    'data': [
        'views/menu.xml'
    'installable': True,
    'application': True,
}
