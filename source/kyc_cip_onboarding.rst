Financial Use Case Reference Architecture
==========================================

The figures below are a graphical representation of the representative architecture we are implementing as part of the NCCoE Lab demonstration. This
architecture is based on criteria that resulted from discussions with our industry collaborators and is a more detailed view than what we previously published
with our `notional architecture <https://www.nist.gov/image/vdc-map>`__. These figures show the general interactions between key components while also
highlighting some of the important protocols implemented as part of the architecture. It also captures the commercially available technology, internally
developed systems, and open-source platforms we used to implement the architecture. We encourage the reader to read our `Digital Identities: Getting to Know the
Verifiable Digital Credential
Ecosystem <https://www.nist.gov/blogs/cybersecurity-insights/digital-identities-getting-know-verifiable-digital-credential-ecosystem>`__ blog post to learn more
about the components referenced in the architecture.

The figures below depict two planned scenarios for the demonstration - *same-device* and *cross-device* flows. These flows are defined in the `Open ID for
Verifiable Presentations <https://openid.net/specs/openid-4-verifiable-presentations-1_0.html>`__ (OpenID4VP) specification as:

**Cross device** - *A flow where the End-User presents a Credential to a Verifier interacting with the End-User on a different device as the device the Wallet
resides on.*

**Same device** - *A flow where the End-User presents a Credential to a Verifier interacting with the End-User on the same device that the device the Wallet
resides on.*

To see a video example of what the cross-device flow might look like from the customer's perspective, please review our `wireframe
videos. <wireframes.html>`__

Architecture Diagrams
-----------------------

Each flow makes the following assumptions:

1. A banking customer navigates to a banking service and engages in an action that requires them to present their mDL. For the NCCoE project, the customer will
   be required to present their mDL for identity proofing when opening a new financial account and for step-up verification when a user conducts a high-risk
   transaction.

2. The customer has an mDL provisioned to the digital wallet on their mobile device and chooses to present it to the bank.

3. The bank has verifier capabilities to request and cryptographically verify the mDL.

4. The bank can create and manage the customer's account via an identity management system.

.. figure:: media/image1.png
   :width: 6.5in
   :height: 5.49444in

   **Figure 1 Cross-Device Flow.** A flow where the holder presents an mDL stored in the digital wallet on their mobile device to a service the user is
   interacting with through a web browser on a desktop or laptop. The web browser will present the user with a QR code to invoke the wallet on the mobile
   device.

.. figure:: media/image2.png
   :width: 6.5in
   :height: 8.35417in

   **Figure 2 Same-device flow.** A flow where the mDL holder presents an mDL stored in the digital wallet on their mobile device to another application on the
   same device. This application could be a native application or could be a website the user has navigated to through a mobile browser.

Architecture Components
------------------------

For an overview of the general architecture components, please review our `Digital Identities: Getting to Know the Verifiable Digital Credential
Ecosystem <https://www.nist.gov/blogs/cybersecurity-insights/digital-identities-getting-know-verifiable-digital-credential-ecosystem>`__ blog post.

To facilitate the demonstration needed for this project, the NCCoE is building a fictitious bank called the NCCoE Bank. This service is represented in the
architecture as the financial institution banking systems. These represent a minimal set of banking capabilities that can be adapted to operational systems.
These capabilities include:

**Banking Backend** - A system that implements a scoped set of banking functions, provides an API to facilitate front end interactions, and a client to the core
banking services.

**Core Banking Services** - Refer to the systems that facilitate vital bank business. For our demonstration this will including processing transactions and
updating accounts. [4]_.

**Identity Management System (IDMS) Provisioning API** - A system that implements interfaces that interact with the IDMS to facilitate account opening and
digital enrollment phases.

**API Proxy** - A reverse proxy routing requests from clients to
services [5]_.

**SSN Validation Service** - A system that emulates the functionality of the Electronic Consent Based SSN Verification (eCBSV)
Service [6]_ designed to validate social security numbers.

**Data Storage** - The core banking repository for data retention criteria and associated transactional data.

**Standards Included in this Architecture**

This architecture makes use of several standards in the mDL ecosystem. To learn more about the standards that encompass the VDC ecosystem, we encourage the
reader to visit our upcoming deep dive in our blog series [8]_.

**OpenID4VP** - OpenID4VP is a protocol under the OpenID Foundation that enables the presentation of verifiable digital credentials (in this case mobile
driver's licenses) and is built upon multiple standardized protocols and data formats.

**ISO 18013-5 -** An international standard that defines the specifications for mDLs and their data exchange with electronic devices. It defines the
technical structure and data structure of mDLs, including how personal data should be encoded and stored securely.

**ISO 18013-7 -** An international standard that defines the specifications for mDLs licenses and their data exchange during online presentation.

**Digital Credentials API** - In both flows, our demonstration banking system may leverage a modern web browser which implements the Digital Credential
API [7]_. This draft community group report describes how relying parties,
such as financial institutions, can request the presentation of digital credentials from wallet applications. In our scenarios, this API will facilitate
identity verification during the account application, digital enrollment, and re-verification.

**WebAuthN -** is a web standard developed by the World Wide Web Consortium (W3C) and the FIDO Alliance (Fast Identity Online). It allows websites and
applications to implement phishing resistant authentication using passkeys and/or external security keys. This project will demonstrating a user creating and
authenticating with a passkey.

**OAuth 2.0 -** OAuth 2.0 is an authorization standard that may be used to support access control objectives by API services. The standard defines a set of
technical specifications for the generation, protection, and delivery of authorization tokens (JSON Web Tokens or JWT) to different connected endpoints (e.g.,
servers). The authorization (or access token) is used to define what actions an endpoint may take relative to a specific service. For API protection, these
tokens are typically issued to consumers of the service, allowing them to make requests to the API service and allowing the API service to confirm that such
requests are coming from a valid and approved source.

**OpenID Connect** [9]_ - OpenID Connect 1.0 (OIDC) is a specification that
is built upon the Internet Engineering Task Force OAuth2 Authorization
Framework [10]_ which enables application and website developers to launch
sign-in flows and receive verifiable assertions about users across Web-based, mobile, and JavaScript clients.

We're currently working with our technology partners to create a customized OIDC profile that will describe how a financial institution can leverage OIDC with
an identity management system to support the demonstration scenarios. In this future profile, we will use OIDC to invoke an authentication event from a Passkey
or an identity verification event via a mobile driver's license. Further, in the same-device flow, the authentication events will adhere to IETF's Best Current
Practice [11]_ when using a native banking applications.

.. [1]
   https://www.nist.gov/image/vdc-map

.. [2]
   https://openid.net/specs/openid-4-verifiable-presentations-1_0.html

.. [3]
   https://www.nist.gov/blogs/cybersecurity-insights/digital-identities-getting-know-verifiable-digital-credential-ecosystem

.. [4]
   https://crsreports.congress.gov/product/pdf/IF/IF11985

.. [5]
   https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway

.. [6]
   https://www.ssa.gov/dataexchange/eCBSV/documents/Technical%20Information%20Document%20for%20eCBSV.pdf

.. [7]
   https://wicg.github.io/digital-credentials/

.. [8]
   https://www.nist.gov/blogs/cybersecurity-insights

.. [9]
   https://openid.net/developers/how-connect-works/

.. [10]
   https://datatracker.ietf.org/doc/html/rfc6749

.. [11]
   https://datatracker.ietf.org/doc/html/rfc8252
