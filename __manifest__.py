{
    'name': 'TobaccoMetricsPro',
    'version': '1.0.3', 
    'category': 'Administration',
    'summary': 'Herramientas de análisis y visualización para la industria tabacalera.',
    'author': 'Antonio Queb',
    'website': 'https://www.fingrow.co',
    'depends': ['base', 'web', 'sale','board'],
    'data': [
        'views/menu.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'TobaccoMetricsPro/static/src/components/**/*.js',
            'TobaccoMetricsPro/static/src/components/**/*.xml',
        ]
    },
    
    'installable': True,
    'application': True,
    'auto_install': False,

}
