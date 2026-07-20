Comparative analysis of mDL to current CIP techologies :bdg-success:`New`
=========================================================================

.. note::

    The considerations below have been replicated from `NIST Special Publication (SP) 1800-42A Initial Public Draft`_, Digital Identities - Mobile Driver’s License (mDL): Accelerating Development and Adoption of Digital Identity for Financial Institutions.

    ..  _NIST Special Publication (SP) 1800-42A Initial Public Draft: https://www.nccoe.nist.gov/sites/default/files/2026-03/nist-sp-1800-42a-ipd_0.pdf



This page summarizes security, privacy, and usability implementation considerations when compared to the following CIP documentation models as defined below:

**Non-Documentary** - Self-asserted data (e.g. name, address, tax identifier) checked against third party data sources, SMS verification, and email verification.

**Government Identification Check -** Self-asserted data coupled with software-driven document authentication against an uploaded image of a physical identification card, SMS verification, email verification.

**Government Identification Check (Biometric Match) -** Self-asserted data coupled with document authentication and a biometric comparison of the user to their presented evidence, SMS verification, email verification.

**Government Identification Check (mDL) -** Presentation of signed mDL data and local holder authentication, SMS verification, email verification, party validation of an SSN.



.. include:: comparison-tables.rst