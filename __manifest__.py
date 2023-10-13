{
    'name': 'tobaccometricspro',
    'version': '1.0.0.0',  # Aquí puedes aumentar la versión
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
        'security/ir.model.access.xml',  # Agregando el archivo de seguridad
        'views/menu.xml',  # Añadiendo la nueva vista XML
    ],
    'installable': True,
    'application': True,
}
