.. dropdown:: Orchestration Steps Description 
    :class-container: howtodrop

      +----------------------------------------------------------------------------------------------------+
      | Step 1: Email Collection                                                                           |
      +=====================================+==============================================================+
      | Purpose                             | Collects the applicant’s email address as the primary        |
      |                                     | identifier.                                                  |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders email collection template in the web browser.        |
      |                                     |                                                              |
      |                                     | |Graphical user interface, text, application, email          |
      |                                     | AI-generated content may be incorrect.|                      |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Uses a built-in Azure B2C web template that collects the     |
      |                                     | applicant’s email address and displays a message explaining  |
      |                                     | collection purpose. The submitted email address is saved as  |
      |                                     | a claim for the next step in the flow.                       |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 2: Email Verification                                                                         |
      +=====================================+==============================================================+
      | Purpose                             | Verifies the collected email address through One Time        |
      |                                     | Password/Code verification.                                  |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders self-asserted-verifyEmail.cshtml template            |
      |                                     |                                                              |
      |                                     | |Graphical user interface, application AI-generated content  |
      |                                     | may be incorrect.|                                           |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Uses a built-in Azure B2C OTP verification logic to ensure   |
      |                                     | the applicant has access to a valid email account. Note that |
      |                                     | this is not related to identity vetting of the individual.   |
      |                                     | On successful validation, Azure B2C saves the state in the   |
      |                                     | current session.                                             |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 3: Phone Collection                                                                           |
      +=====================================+==============================================================+
      | Purpose                             | Collects the user's phone number for additional verification |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | - Renders self-asserted-collectPhone.cshtml template         |
      |                                     |                                                              |
      |                                     | |image1|                                                     |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Uses a built-in Azure B2C web template that collects the     |
      |                                     | applicant’s phone number and displays a message explaining   |
      |                                     | collection purpose. The submitted phone number is saved as a |
      |                                     | claim for the next step in the flow.                         |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 4: Phone Verification                                                                         |
      +=====================================+==============================================================+
      | Purpose                             | Verifies the phone number through Short Messaging Service    |
      |                                     | OTP                                                          |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders self-asserted-verifyPhone.cshtml template            |
      |                                     |                                                              |
      |                                     | |image2|                                                     |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Uses a built-in Azure B2C OTP verification logic to ensure   |
      |                                     | the applicant has access to a valid phone number. Note that  |
      |                                     | this is not related to identity vetting of the individual.   |
      |                                     | On successful validation, Azure B2C saves the state in the   |
      |                                     | current session.                                             |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 5: SSN Collection                                                                             |
      +=====================================+==============================================================+
      | Purpose                             | Collects Social Security Number for identity verification    |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders self-asserted-collectSsn.cshtml template             |
      |                                     |                                                              |
      |                                     | |Graphical user interface AI-generated content may be        |
      |                                     | incorrect.|                                                  |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Uses a generic input template to collect SSN and display an  |
      |                                     | instructional message. The SSN is stored as a claim and      |
      |                                     | persisted to the Azure B2C directory for later validation by |
      |                                     | the banking system.                                          |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 6: Verification Method Selection                                                              |
      +=====================================+==============================================================+
      | Purpose                             | Allows user to choose their preferred identity verification  |
      |                                     | method                                                       |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders self-asserted-verificationMethod.cshtml template     |
      |                                     |                                                              |
      |                                     | |image3|                                                     |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Provides an interface for the applicant to choose a          |
      |                                     | preferred verification method. Only mDL verification option  |
      |                                     | is supported within this demonstration. The applicant’s      |
      |                                     | selection is stored as a claim for subsequent steps in the   |
      |                                     | flow.                                                        |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 7: mDL Verification                                                                           |
      +=====================================+==============================================================+
      | Purpose                             | Performs mobile Driver's License (mDL) verification using    |
      |                                     | MATTR SDK                                                    |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders self-asserted-mdlUri.cshtml template                 |
      |                                     |                                                              |
      |                                     | |Graphical user interface, text, application AI-generated    |
      |                                     | content may be incorrect.|                                   |
      |                                     |                                                              |
      |                                     | |Qr code AI-generated content may be incorrect.|             |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Provides the logic that implements the mDL verification via  |
      |                                     | the MATTR SDK. First, B2C invokes two bank system endpoints  |
      |                                     | which receive a MATTR OAuth token and retrieves a session    |
      |                                     | identifier using the MATTR Verifier API. Next, the MATTR SDK |
      |                                     | is initiated with the retrieved session identifier which     |
      |                                     | invokes the Digital Credential API. After the applicant      |
      |                                     | completes the Digital Credential API flow, control is        |
      |                                     | returned to the MATTR SDK where the presented attributes are |
      |                                     | queried by B2C. The extracted attributes are stored as       |
      |                                     | claims for further processing.                               |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 8: Review mDL Claims                                                                          |
      +=====================================+==============================================================+
      | Purpose                             | Displays extracted mDL data for user review and confirmation |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders self-asserted-reviewMdlClaims.cshtml template        |
      |                                     |                                                              |
      |                                     | |Graphical user interface, application, Teams AI-generated   |
      |                                     | content may be incorrect.|                                   |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Provides display interface for the attributes presented by   |
      |                                     | the applicant and updates the user account in the Azure AD   |
      |                                     | B2C directory with a preferred address (if provided). The    |
      |                                     | applicant’s mDL license number and issuing authority are     |
      |                                     | concatenated along with salt to produce a unreversible       |
      |                                     | unique identifier. The unique identifier is persisted in the |
      |                                     | B2C directory for the second phase (digital enrollment).     |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 9: Approval Status                                                                            |
      +=====================================+==============================================================+
      | Purpose                             | Shows final registration status and approval message         |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      | Renders approval status template                             |
      |                                     |                                                              |
      |                                     | |image4|                                                     |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Displays interface that provides “Exit” button and informs   |
      |                                     | the applicant that this phase of the application process has |
      |                                     | been completed. The exit button invokes the final step in    |
      |                                     | the account application process.                             |
      +-------------------------------------+--------------------------------------------------------------+

      +----------------------------------------------------------------------------------------------------+
      | Step 10: Token Issuance                                                                            |
      +=====================================+==============================================================+
      | Purpose                             | Issues the final JWT token containing all verified claims    |
      +-------------------------------------+--------------------------------------------------------------+
      | User Interface                      |                                                              |
      +-------------------------------------+--------------------------------------------------------------+
      | Technical Details                   | Completes the frontend OpenID Connect interactions with an   |
      |                                     | Authorization Response that redirects the applicant back to  |
      |                                     | the banking system website. The calculated mDL unique        |
      |                                     | identifier and B2C identifier are returned in the access     |
      |                                     | token as a claim for processing by the banking system.       |
      +-------------------------------------+--------------------------------------------------------------+

      .. |Graphical user interface, text, application, email AI-generated content may be incorrect.| image:: /media/reg1.png
         :width: 4.25956in
         :height: 2.13388in
      .. |Graphical user interface, application AI-generated content may be incorrect.| image:: /media/reg2.png
         :width: 5.53403in
         :height: 2.97708in
      .. |image1| image:: /media/reg3.png
         :width: 5.53403in
         :height: 2.57014in
      .. |image2| image:: /media/reg4.png
         :width: 5.53403in
         :height: 3.01944in
      .. |Graphical user interface AI-generated content may be incorrect.| image:: /media/reg5.png
         :width: 5.53403in
         :height: 2.63403in
      .. |image3| image:: /media/reg6.png
         :width: 5.53403in
         :height: 3.99097in
      .. |Graphical user interface, text, application AI-generated content may be incorrect.| image:: /media/reg7.png
         :width: 5.53403in
         :height: 2.16389in
      .. |Qr code AI-generated content may be incorrect.| image:: /media/reg8.png
         :width: 2.4737in
         :height: 2.12666in
      .. |Graphical user interface, application, Teams AI-generated content may be incorrect.| image:: /media/reg9.png
         :width: 5.53403in
         :height: 4.37639in
      .. |image4| image:: /media/reg10.png
         :width: 5.53403in
         :height: 2.04097in
