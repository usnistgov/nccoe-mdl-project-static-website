Reference Architecuture and Demonstration Videos :bdg-success:`New`
===================================================================

The sections below depict two demonstrated scenarios - *same device* and *cross device* flows. These flows are defined in the `Open ID for
Verifiable Presentations <https://openid.net/specs/openid-4-verifiable-presentations-1_0.html>`__ (OpenID4VP) specification as:

**Cross-device** - *A flow where the End-User presents a Credential to a Verifier interacting with the End-User on a different device as the device the Wallet
resides on.*

**Same-device** - *A flow where the End-User presents a Credential to a Verifier interacting with the End-User on the same device that the device the Wallet
resides on.*

In each section, we present a graphical representation of the representative architecture and demonstration videos we have implemented as part of this project. Each architecture is based on criteria that resulted from discussions with our industry collaborators and is a more detailed view than what we previously published with our `notional architecture <https://www.nist.gov/image/vdc-map>`__. These figures show the general interactions between key components while also highlighting some of the important protocols implemented as part of the architecture. It also captures the commercially available technology, internally developed systems, and open-source platforms we used to implement the architecture. We encourage the reader to read our `Digital Identities: Getting to Know the Verifiable Digital Credential Ecosystem <https://www.nist.gov/blogs/cybersecurity-insights/digital-identities-getting-know-verifiable-digital-credential-ecosystem>`__ blog post to learn more about the components referenced in the architecture.

In future demonstrations the project will demonstrate how additional credentials, such as an digital Social Security Number card, can be presented alongside an mDL to further streamline know your customer (KYC) scenarios using cross and same-device architectures. While this multicredential flow is directly applicable to financial institutions, it will be applicable to any sector that has a KYC requirement. 

Cross-device Architecture
+++++++++++++++++++++++++

The cross-device flow interaction this demonstration is initiated from a laptop/desktop computer and completed by a wallet installed on the mobile device. 

.. tip::
  Click Next to see the architecture in action 

.. card-carousel:: 5
  :class: demo-carousel

  .. card::   
    :class-card: welcome transparent
    :width: 100%
      
     

    .. thumbnail:: ../../media/cross-device-architecture.png
      :align: center
      :alt: "Cross Device Flow diagram."



  .. card::   
    :class-card: welcome 
    :width: 100%


    Applying to open a new account, using an mDL as evidence to verify the identity of a new customer.
      
    .. raw:: html

      <div id="demo-video-1" class="demo-video-player"></div>

  .. card::   
    :class-card: welcome 
    :width: 100%

    Setting up online access for a newly opened account, using an mDL to confirm that the user accessing the account is the same user who applied for the account.
      
    .. raw:: html
      
      <div id="demo-video-2" class="demo-video-player"></div>

  .. card::   
    :class-card: welcome 
    :width: 100%

    Offering an instant approval user journey where the application is approved and the account is set up in the same session, without requiring the customer to come back in a subsequent session to set up online access.
      
    .. raw:: html
      
      <div id="demo-video-3" class="demo-video-player"></div>

  .. card::   
    :class-card: welcome 
    :width: 100%

    Using an mDL as a step-up verification when the user initiates a high-value transaction or the financial institution's fraud system flags the transaction as high risk.
      
    .. raw:: html
      
      <div id="demo-video-4" class="demo-video-player"></div>






Same-device Architecture
++++++++++++++++++++++++

The same-device flow interactions are demonstrated in two ways: 

* Initiated by a banking app installed on the mobile app and completed by a wallet app on the same device. The banking app was created by the NCCoE project team using Android's `Credential Manager - Verifier API <https://developer.android.com/identity/digital-credentials/credential-verifier>`__. 
* Initiated by a banking website installed on the mobile app and completed by a wallet app on the same device. 


.. tip::
  Click Next to see the architecture in action 

.. card-carousel:: 3
  :class: demo-carousel

  .. card::   
    :class-card: welcome transparent
    :width: 100%
      
     

    .. thumbnail:: ../../media/highressamedevice.png
      :align: center
      :alt: "Same Device Flow diagram."



  .. card::   
    :class-card: welcome 
    :width: 100%
      
    Using an mDL as a step-up verification when the user initiates a high-value transaction or the financial institution’s fraud system flags the transaction as high risk using a mobile device.

    .. raw:: html

      <div id="demo-video-5" class="demo-video-player"></div>

  .. card::   
    :class-card: welcome 
    :width: 100%

    Offering an instant approval user journey on a mobile device where the application is approved and the account is set up in the same session, without requiring the customer to come back in a subsequent session to set up online access.
      
    .. raw:: html
      
      <div id="demo-video-6" class="demo-video-player"></div>

Architecture Components
+++++++++++++++++++++++

For an overview of the general architecture components, please review our `Digital Identities: Getting to Know the Verifiable Digital Credential
Ecosystem <https://www.nist.gov/blogs/cybersecurity-insights/digital-identities-getting-know-verifiable-digital-credential-ecosystem>`__ blog post.

To facilitate the demonstration needed for this project, the NCCoE is building a fictitious bank called the NCCoE Bank. This service is represented in the
architecture as the financial institution banking systems. These represent a minimal set of banking capabilities that can be adapted to operational systems.
These capabilities include:

**Banking Backend** - A system that implements a scoped set of banking functions, provides an API to facilitate front end interactions, and a client to the core
banking services.

**Core Banking Services** - Refer to the systems that facilitate vital bank business. For our demonstration this will including processing transactions and
updating accounts. [4]_.

**Verifier Mediation Service** - A system that implements interfaces that interact with the IDMS to facilitate account opening and
digital enrollment phases.

**SSN Validation Service** - A system that emulates the functionality of the Electronic Consent Based SSN Verification (eCBSV)
Service [6]_ designed to validate social security numbers.

**Data Storage** - The core banking repository for data retention criteria and associated transactional data.

Standards Included in this Architecture
+++++++++++++++++++++++++++++++++++++++

This architecture makes use of several standards in the mDL ecosystem. To learn more about the standards that encompass the VDC ecosystem, we encourage the
reader to visit our upcoming deep dive in our blog series [8]_.

**OpenID for Verifiable Presentations (OpenID4VP)** - OpenID4VP [2]_ is a protocol described by the OpenID Foundation that enables the presentation of verifiable digital credentials (in this case mobile
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

.. raw:: html

   <script src="https://cdnapisec.kaltura.com/p/684682/embedPlaykitJs/uiconf_id/55674542"></script>
   <script>
     (function () {
       var videos = [
         { targetId: 'demo-video-1', entryId: '1_f7yg7xip' },
         { targetId: 'demo-video-2', entryId: '1_jmhso0d0' },
         { targetId: 'demo-video-3', entryId: '1_07kamqe0' },
         { targetId: 'demo-video-4', entryId: '1_4c2ihze7' },
         { targetId: 'demo-video-5', entryId: '1_y4vrkvdv' },
         { targetId: 'demo-video-6', entryId: '1_id4227cg' }
       ];

       function initDemonstrationVideos() {
         if (typeof KalturaPlayer === 'undefined') {
           return;
         }

         videos.forEach(function (video) {
           if (!document.getElementById(video.targetId)) {
             return;
           }

           var player = KalturaPlayer.setup({
             targetId: video.targetId,
             provider: {
               partnerId: 684682,
               uiConfId: 55674542
             },
             playback: {
               autoplay: false
             }
           });

           player.loadMedia({ entryId: video.entryId });
         });
       }

       if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', initDemonstrationVideos);
       } else {
         initDemonstrationVideos();
       }
     }());
   </script>

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :glob:
   :hidden:

   interaction-diagrams.rst