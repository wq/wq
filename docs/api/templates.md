Mustache Templates in wq
========================
[wq.app] and [wq.db] both use [Mustache]-powered HTML templates as the primary means of rendering application screens.  By sharing identical templates between the client and the server, wq is able to leverage the advantages of the MVC approach without strictly requiring that the client is able to run JavaScript.