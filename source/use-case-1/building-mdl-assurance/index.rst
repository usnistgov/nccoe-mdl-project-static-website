Building Assurance in the mDL Ecosystem
=======================================

In our discussion with the Financial Institutions (FIs) under the NCCoE mDL project, FIs have expressed need for additional clarity around the processes 
used to enroll, issue and present mDLs. Specifically, FIs must have a clear understanding of the assurances they are getting and the potential risk they 
are accepting when implementing mDLs.

Traditionally, FIs own and control their identity verification systems, which allows for maximum agility when responding to threats and mitigating risks 
associated with identity verification. While the mDL ecosystem offers potential benefits to FIs across security, privacy and usability, it also requires 
confidence in third parties such as the mDL issuer and wallet that stores the mDL. This document outlines technical implementations and security controls 
that could provide FIs the assurance they seek.

Absent additional assurances, there is concern that high assurance relying parties (HARPs) may ask users to complete a server-side biometric match whenever 
an mDL is presented. If possible, we would like to avoid this for usability, privacy, and performance reasons. There are also potential impacts to broader 
adoption of mDLs if HARPs are not able to understand, convey, and address perceived risks related to mDL usage.

**Issue #1: Enrollment into the System of Record (SOR) at the DMV**

**What we heard**: FIs are concerned about lack of visibility into the process used to vet identity and enroll a user into the SOR at the DMVs when issuing the
user with their initial, physical credentials on which the mDL will be based.

**Discussion**: Each state has their own, clear authorities for how they enroll residents at the DMV. However, in order to be used for access to federal
facilities (including airports) licenses are mandated to comply with the RealD act which covers expectations for enrollment at the DMV.

**Proposed Solution**: The NCCoE project will develop a profile of ISO 18013-5 data elements consistent with the requirements provided by the Association of
American Motor Vehicle Administrators (AAMVA) [1]_ which will include the DHS Compliance data element encoded into the mobile security object (MSO) of the mDL. 
This element will allow FIs to decide how to treat credentials based on whether the individual was enrolled into the DMV SOR and issued a driver’s license/ID
consistent with Real ID issuance requirements.

.. list-table::
   :widths: 53 53 53
   :header-rows: 1

   * - Identifier
     - Meaning
     - Definition
   * - DHS_compliance
     - Compliance type
     - Field that indicates compliance with REAL ID. Only the following values are allowed: “F” = fully compliant “N” = non-compliant If a state chooses not to
       participate in REAL ID, all its credentials are considered “N”. [2]_


Additionally - DHS plans to publish a list of those state mDL programs that have been assessed by DHS for alignment with the `Waiver
Program <https://www.govinfo.gov/content/pkg/FR-2024-10-25/pdf/2024-23881.pdf>`__. This includes assessment against 79 requirements as well as an assessment of
their Real ID issuance process for physical cards. This will not include assessment of the mDL provisioning/issuance process in any detail.

**Issue #2: Issuance of the mDL or Digital Credential to the Holder’s Digital Wallet**

**What we heard:** FIs are concerned about the limited visibility they have into issuance processes for mDL and other forms of verifiable digital credentials.
With mDLs becoming more valuable, the issuance processes are increasingly likely to be the focus of attackers.

**Discussion**: We often hear a discussion of a “three-way” biometric match between the image on the physical license, the live facial recognition capture of the individual and
the image that exists in the system of record (SOR) at the DMV. In addition to how the facil recognition match is performed, FIs have concerns around biometric injection
attacks. FIs would like clarity on the liveness, presentation attack detection, and other controls that protect For mDL, the issuance information could be
addressed by greater consistency through normative requirements that the states follow when issuing mDLs.

**Proposed Solution Part 1: The development of NIST SP 800-63A profile that aligns the controls in that guidance to the specific issuance use cases.**
NIST’s Digital Identity Guidelines contain controls for validation, verification, biometric performance, document validation, and injection protection. As a
primary concern expressed by FIs is inconsistency in the mDL issuance process, a profile could serve as a reference for issuers seeking a common set of
requirements. This could not be normative as NIST has no authority to direct state actions, but could be referenced by entities such as AAMVA, TSA, or FIs
themselves when evaluating state issuers for acceptance. A draft of this profile can be found `here <nist_800-63a.html>`__.

**Proposed Solution Part 2:** **The encoding of issuance information into the credential itself.**
Encode issuance information into the mDL credential itself (i.e., the MSO itself) so that FI will have issuer signed data to evaluate related to the issuance
process. Use OpenID connect for syntax and naming conventions to align with federation efforts across the identity ecosystem. This will allow FIs to inspect
and assess the specific process taken to issue the digital form of the driver’s license to a user’s wallet or mDL application and determine how they wish to
treat it at run-time. The requested elements mapped to available claims and values from the OpenID Connect (OIDC) for Information Assurance (IA) [3]_ are included below.


.. list-table::
   :class: fi-requested-item
   :widths: 53 53 53
   :header-rows: 1

   * - FI Requested Item
     - OIDC for IA Claim
     - Relevant OIDC for IA Values
   * - **Evidence**: The evidence presented to support the issuance of an mDOC to the user’s wallet.
     - Documents
     - **idcard**

       An identity document issued by a country’s government for the purpose of identifying a citizen.

       **US Drivers License**

       An identity document
       issued by a national or local authority identifying the user and defining driver’s privileges.

       **US State ID**

       An identity document issued by US state that does not include driver’s privileges.
   * - **Issuance Type:** The general type of issuance that occurred.
     - Method
     - **pipp**

       Physical In-Person Proofing.

       **uripp**

       Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video
       and liveness checks.

       **sripp**

       Supervised remote In-Person Proofing
   * - **Validation**: The processes used to confirm the accuracy of the information contained on the evidence.
     - Electronic Records
     - **dmv_register**

       A record from an institution or authority that issues drivers licenses or identification cards.
   * - **Authenticity**: The process used to confirm the evidence is genuine and has not been forged, modified, or tampered with.
     - Check Methods
     - **vpip** Validation that physical evidence is genuine through inspection of its physical properties in person.

       **vpiruv**

       Validation that physical
       evidence is genuine through inspection of its physical properties in person including its optical characteristics under non-visible light.

       **vri**

       Validation that physical evidence is genuine through the inspection of an image taken remotely under visible light.

       **vcrypt**

       Validation the cryptographic security features of the evidence are intact and correct.
   * - **Authenticity Presentation Attack Detection**: Automated capture and inspection of evidence included methods for detecting digitally generated images of
       the evidence.
     - Check methods
     - **docpad**

       Live capture was used to determine the authenticity of a remotely presented document used during a remote identity proofing event.
   * - **Verification**: The process used to confirm the applicant is the individual represented by the evidence.
     - Check Methods
     - **pvp**

       Physical verification in person by a qualified/authorised person, the comparison of a physical characteristic (such as face) of the user with a
       known image/template of the owner of the claims.

       **pvr**

       Physical verification by a qualified/authorised person when the user is remote, the comparison
       of a physical characteristic (such as face) from an image or video of the user with a known image/template of the owner of the claims.

       **bvp**

       Biometric verification by an automated system with the user physically present to the system and the verifier, the use of a biometric modality (such as face) to
       match the user with a known template of the owner of the claims.

       **bvr**

       Biometric verification by an automated system where the user and capture device
       is remote to the verifier, the use of a biometric modality (such as face) to match the user with a known template of the owner of the claims.

       **pstl**

       Verification of the user was conducted by mailing an enrollment code to the address of record contained on supplied evidence or available within an
       authoritative system of record.
   * - **Biometric Presentation Attack Detection**: The evidence was checked using methods to detect potential imposters posing as the individual represented in
       the evidence or presenting digitally generated.
     - Check Methods
     - **biopad**

       Presentation attack detection tools were used to confirm the presence of a genuine human during a remote identity proofing event.
   * - **Biometric Digital Injection Attack Mitigation**: The evidence was checked using methods to detect or mitigate attempts of bypassing the biometric capture sensor by injecting synthetic or captured biometric data directly into the systems data stream.
     - Check Methods
     - **biodi**

       Biometric digital injection detection and mitigation tools were used to confirm the authenticity of the received biometric data during a remote identity proofing event
.. rst-class:: red-text

\*Red Text indicates claims/values that are currently not included in OIDC for IA and thus need to be specified and submitted for approval.

**NOTE: This will likely require changes to the mDL Technical Specifications and will not be able to be tested as part of the NCCoE Build.**

This can also be augmented by trust frameworks and certification programs that allow for issuer processes to be vetted and conveyed in the credential using the
claim and values from OIDC for IA under the “trust framework” claims.

**Issue #3: Holder Binding during mDL Presentment**

**What we heard:** FIs are concerned that processes used to authenticate the holder of an mDL vary in implementation and security assurances across platforms.

**Discussion**: Currently holder authentication processes differ depending on the combination of the wallet and operating system used. Biometric verification is
enforced on some platforms, while a user defined pin is available on others. For biometric verification, some platforms create a new and separate biometric
template during the issuance process that is used for future authentication during presentment, while other platforms rely on previously enrolled biometric
templates used for device unlock. Similarly, users might be given an option to use their device unlock pin to unlock the credential or the wallet may have them
establish a new and separate pin. Each of these processes has different assurance aspects.

**Proposed Solution Part 1: The development of NIST SP 800-63B profile that aligns the controls in that guidance to the specific issuance use cases.**

NIST’s Digital Identity Guidelines contain controls for authentication of users including activation of cryptographic authenticators such as digital wallets. As
a primary concern expressed by FIs is inconsistency in the holder authentication, a profile could serve as a reference for issuers seeking a common set of
requirements. This could not be normative as NIST has no authority to direct state actions, but could be referenced by entities such as AAMVA, TSA, or FIs
themselves when evaluating state issuers for acceptance.

**Purposed Solution Part 2: The encoding of holder authentication information into the presentation.**
Wallets will add information to the presentation that covers the holder authentication process. This will be signed using the same device signing key used in
the MSO. Potential values could be included as indicated below.

.. list-table::
   :widths: 53 53 53
   :header-rows: 1

   * - Holder Auth Type
     - Presentation Value
     - Meaning
   * - Device Unlock - Secret
     - unlk_sec
     - The holder was authenticated using the local device unlock secret such as a PIN, password, or pattern.
   * - Device Unlock - Biometric
     - unlk_bio
     - The holder was authenticated using the local device unlock biometric such as a face recognition, fingerprint, or iris match.
   * - Credential - Secret
     - cred_sec
     - The holder was authenticated using the presentation of a secret (PIN, Password) unique to the credential being presented.
   * - Credential - Biometric
     - cred_bio
     - The holder was authenticated through a biometric match to either a biometric encoded in the credential or a unique template created at the time of
       issuance.

These values may be requested by the RP during the request portion of the presentation protocol if specific values are required to make access or step-up
decisions. Wallets may respond with whatever authentication actions took place, though the responsibility for evaluation remains that of the RP. This is similar
to how the “flags” (e.g., the UV flag) function in WebAuthN/FIDO2.

.. rubric:: Footnotes

.. [1] https://aamva.org/getmedia/261ed16b-3f5c-4678-a2db-cc3016934234/MobileDLImplementationGuidelines-Version1-3.pdf
.. [2] `eCFR :: 6 CFR 37.10 -- Application criteria for issuance of temporary waiver for mDLs; audit report <https://www.ecfr.gov/current/title-6/chapter-I/part-37/subpart-A/section-37.10>`__
.. [3] https://bitbucket.org/openid/ekyc-ida/wiki/identifiers

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :glob:
   :hidden:

   nist_800-63a.rst