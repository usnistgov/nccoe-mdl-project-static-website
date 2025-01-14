# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

import os
import sys


# -- Project information -----------------------------------------------------

project = "NCCoE Mobile Driver's License Project"
html_title = "NCCoE Mobile Driver's License Project"
copyright = 'NIST'
author = 'NIST'


# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration


exclude_patterns = ['_site', 'Thumbs.db', '.DS_Store']

extensions = [
    "myst_parser",
    "sphinxcontrib.jquery",
    "sphinx_copybutton",
    "sphinx_design",
    "sphinx_togglebutton",
    "sphinx.ext.autosectionlabel",
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# The suffix(es) of source filenames.
source_suffix = {
    ".rst": "restructuredtext",
    ".txt": "restructuredtext",
    ".md": "markdown",
}

# The master toctree document.
master_doc = "index"

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = "sphinx"

add_module_names = False

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

on_rtd = os.environ.get("READTHEDOCS") == "True"
html_theme = 'sphinx_book_theme'
html_static_path = ['_static']
html_css_files = [
    "content.css",
    "https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.min.css",
    "https://cdn.datatables.net/2.1.8/css/dataTables.bootstrap5.min.css",
    "custom.css"
]

html_js_files = [
    "jquery.visible.js",
    "jquery.leaveNotice-nist.js",
    "applyLeaveNotice.js",
    "smoothNavScroll.js",
    "https://cdn.datatables.net/2.1.8/js/dataTables.min.js",
    "https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap5.min.js",
    "main.js"
]

html_theme_options = {
    "repository_branch": "main",
    "use_repository_button": False,
    "home_page_in_toc": True,
    "path_to_docs": "docs/source",
}
