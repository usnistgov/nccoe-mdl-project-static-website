# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

import os
import sys
sys.path.append(os.path.abspath("_themes"))

# -- Project information -----------------------------------------------------

project = "NCCoE Mobile Driver's License Project Supporting Resources"
html_title = "NCCoE Mobile Driver's License Project Supporting Resources"
author = 'NIST NCCoE'
email = u'nccoe@nist.gov'
googleanalytics_id = 'G-RJSMY46M5C'



# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration


exclude_patterns = ['build', 'Thumbs.db', '.DS_Store', '.git']

extensions = [
    'sphinxcontrib.rsvgconverter',
    'sphinx.ext.intersphinx',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx_design',
    'sphinx.ext.mathjax',
    'sphinx.ext.viewcode',
    'nccoe_rtd_theme',
    "sphinxcontrib.mermaid",
    "sphinx_datatables",
    "sphinxcontrib.googleanalytics",
    'sphinx_reredirects',
    'sphinxcontrib.images'
]


mermaid_output_format = 'raw'
d3_use_local = '_static/d3.min.js'

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# The suffix(es) of source filenames.
source_suffix = {
    ".rst": "restructuredtext",
    ".txt": "restructuredtext",
    ".md": "markdown",
}

master_doc = 'index'
suppress_warnings = ['image.nonlocal_uri']
pygments_style = 'default'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "nccoe_rtd_theme"
html_theme_path = [os.path.abspath("_themes")]
html_static_path = ['_static']

html_css_files = [
    "https://cdn.datatables.net/2.1.8/css/dataTables.bootstrap5.min.css",
    "custom.css"
]

html_js_files = [
    "https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap5.min.js",
    "main.js"
]

html_logo = "_static/img/nccoe-logo.svg"
html_show_sourcelink = False
html_favicon = "_static/img/favicon.ico"


html_theme_options = {
    'logo_only': False,
    'prev_next_buttons_location': 'none',
    'style_external_links': True,
    'vcs_pageview_mode': '',
    'style_nav_header_background': 'white',
    'flyout_display': 'hidden',
    'version_selector': False,
    'language_selector': False,
    # Toc options
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False,
    'project_page': 'https://www.nccoe.nist.gov/projects/digital-identities-mdl'

}

redirects = {

}