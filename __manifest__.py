{
    'name': 'TobaccoMetricsPro',
    'version': '0.0.7',
    'category': 'Administration',
    'summary': 'Herramientas de análisis y visualización para la industria tabacalera.',
    'author': 'Antonio Queb',
    'website': 'https://www.fingrow.co',
    'depends': ['base', 'web', 'board', 'sale', 'purchase'],
    'assets': {
        'web.assets_backend': [
            'TobaccoMetricsPro/static/src/components/**/**.js',
            'TobaccoMetricsPro/static/src/components/**/**.xml',
            ]
    },
    'data': [
        'views/menu.xml'
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
