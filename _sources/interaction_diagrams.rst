========================
Interaction Diagrams
========================


Introduction
============

The following interaction diagrams visualize the flow of data between components in our `architecture </kyc_cip_onboarding.html>`__ as the user interacts with the NCCoE Bank. 
The flows below are cross-device flows where the user presents their mDL from the digital wallet on their phone to the NCCoE bank through a browser on a secondary device.
These flows correspond to three of our `wireframes </wireframes.html>`__ videos - Applying for a Financial Account using an mDL, Setting up Online Access after Application Approval, 
and Identity Re-verification. The diagrams generally depict user journey “happy paths”, that is, free from error conditions or edge cases. System architects and those in similar 
roles may find these diagrams useful as a reference when implementing their own solutions for an individual use case.

There are interactions which take place prior to the user journeys which not demonstrated in these flows where:

- mDL issuance is out of scope for this project and thus it is assumed the bank applicant has been issued a mobile driver’s license by their state issuer to a digital wallet that supports online presentation. 
- The Verifier system component has been configured to align with the policies of the banking system to include interaction with a Trust Service to download trusted issuers and configuration of approved wallets.

Viewing the Diagrams
====================

While the components in the interaction diagrams align with our `architecture </kyc_cip_onboarding.html>`__, they omit some components and subcomponents 
for brevity and clarity. We used the following color scheme to highlight important protocol interactions. 

.. rst-class:: oidc
OpenID Connect

.. rst-class:: oidvp
OpenID for Verifiable Presentations

Click the diagram to expand it. Once expanded, you can zoom in or out using your mouse scroll wheel and pan by clicking and dragging the diagram.

`Comments and feedback </comments.html>`__ are welcomed.

Flow 1 - Applying for a Financial Account using an mDL
========================================================

This flow details what happens when a user applies for a financial account and verifies their identity with an mDL. For a visualization of this process, please view our `wireframe video <https://www.nist.gov/video/mdl-wireframe-1-applying-financial-account>`__. 
The account application interactions are divided into three sections:

- Part 1 - Initiating the application process in the identity management system triggered by the banking website
- Part 2 - mDL verification steps via the `Digital Credentials API <https://github.com/w3c-fedid/digital-credentials/blob/main/explainer.md>`__
- Part 3 - Collection of additional user identity information and application completion

The attribute retrieval session identifier referenced in the Part 2 (steps 8-12) interaction diagram is the identifier returned by the Verifier when verification is
complete. The session identifier is then used to retrieve the verification results. Refer to our `technology partner <https://learn.mattr.global/guides/remote/web/mdocs-tutorial#adjust-front-channel-to-retrieve-results-via-backend>`__ for additional details.



Cross Device Financial Account Application Flow
-----------------------------------------------

Part 1 - User Initiates Application Process
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mermaid:: media/cross-device-application-flow-part-1.mmd




Part 2 - mDL Verification Using the DC API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mermaid:: media/cross-device-application-flow-part-2.mmd



Part 3 - Collection of Additional User Identity Information and Application Completion
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mermaid:: media/cross-device-application-flow-part-3.mmd


Flow 2 - Setting up Online Access after Application Approval
============================================================

This flow details the user setting up access online access to their financial account, which includes provisioning a passkey. For a visualization of this process, please view our `wireframe video <https://www.nist.gov/video/mdl-wireframe-2-online-access-setup>`__.
The Digital Enrollment interactions are divided into two sections:

- Part 1 - Initiating the digital enrollment process triggered by a notification from the banking system
- Part 2 - Passkey registration and linking to the applicant

This flow and wireframe demonstrate an asynchronous process where the user submits their application, waits for approval and returns to financial institute webpage to set up online access, which requires the user to present their mDL again to link their identity with the original account application. This re-verification flow occurs in Flow 2, Part 1, Step 9 and is the same as Flow 1 - `Part 2 <#part-2-mdl-verification-using-the-dci-api>`__. 


Cross Device Setting up Online Access
-------------------------------------

Part 1 - Initiating the Digital Enrollment Process Triggered by a Notification from the Banking System
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mermaid:: media/cross-device-digital-enrollment-flow-part-1.mmd


Part 2 - Passkey Registration and Linkage to the Applicant
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mermaid:: media/cross-device-digital-enrollment-flow-part-2.mmd


Flow 3 - Re-Verification for Step-Up Flow
===========================================

The step-up verification interactions below depicts a transaction that is initially denied due to exceeding a pre-determined threshold and requests reverification
of the mDL. For a visualization of this process, please view our `wireframe video <https://www.nist.gov/video/mdl-wireframe-4-account-re-verification>`__.

This re-verification flow that occurs at Flow 3, Step 10 and is the same as Flow 1 - `Part 2 <#part-2-mdl-verification-using-the-dci-api>`__. 


Re-verification for Step-Up Flow
---------------------------------

.. mermaid:: media/re-verification-flow.mmd
