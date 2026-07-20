Demonstration Videos :bdg-primary:`Updated`
==============================================

Videos 1-5 below are recordings of the architecture built with our technology providers in various cross-device (desktop to mobile device) and same-device (app-to-app) scenarios. Video 6 offers an instant approval demonstration using a mobile device browser compliant with the Digital Credential API. Click on each dropdown to view the video.

.. dropdown:: 1. Applying to open a new account, using an mDL as evidence to verify the identity of a new customer.
   :name: demonstration-video-1
   :animate: fade-in-slide-down

   .. raw:: html

      <div id="demo-video-1" class="demo-video-player"></div>

.. dropdown:: 2. Setting up online access for a newly opened account, using an mDL to confirm that the user accessing the account is the same user who applied for the account.
   :name: demonstration-video-2
   :animate: fade-in-slide-down

   .. raw:: html

      <div id="demo-video-2" class="demo-video-player"></div>

.. dropdown:: 3. Offering an instant approval user journey (where the application is approved and the account is set up in the same session, without requiring the customer to come back in a subsequent session to set up online access).
   :name: demonstration-video-3   
   :animate: fade-in-slide-down

   .. raw:: html

      <div id="demo-video-3" class="demo-video-player"></div>

.. dropdown:: 4. Using an mDL as a step-up verification when the user initiates a high-value transaction or the financial institution's fraud system flags the transaction as high risk.
   :name: demonstration-video-4   
   :animate: fade-in-slide-down

   .. raw:: html

      <div id="demo-video-4" class="demo-video-player"></div>

.. dropdown:: 5. Using an mDL as a step-up verification when the user initiates a high-value transaction or the financial institution’s fraud system flags the transaction as high risk using a mobile device.
   :name: demonstration-video-5  
   :animate: fade-in-slide-down

   .. raw:: html

      <div id="demo-video-5" class="demo-video-player"></div>

.. dropdown:: 6. Offering an instant approval user journey on a mobile device (where the application is approved and the account is set up in the same session, without requiring the customer to come back in a subsequent session to set up online access)
   :name: demonstration-video-6  
   :animate: fade-in-slide-down

   .. raw:: html

      <div id="demo-video-6" class="demo-video-player"></div>

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
