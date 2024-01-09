<section class="step-by-step">
<article class="template-content">
        <div class="windows">
            <?php
            $currentStep = isset($_GET['step']) ? $_GET['step'] : 'step01';
            include "src/inc/step/{$currentStep}.php";
            ?>
        </div>

        <div class="step-loader timeline">
            <!-- Boutons pour chaque étape -->
            <button class="btn-circle" onclick="window.location.href='?step=step01'">Étape 1</button>
            <button class="btn-circle" onclick="window.location.href='?step=step02'">Étape 2</button>
            <button class="btn-circle" onclick="window.location.href='?step=step03'">Étape 3</button>
            <button class="btn-circle" onclick="window.location.href='?step=step04'">Étape 4</button>
            <button class="btn-circle" onclick="window.location.href='?step=step05'">Étape 5</button>
        </div>
</article>
    <script>
        function loadStep(stepNumber) {
    // Logique pour charger l'étape correspondante
    // Par exemple, modifier l'URL ou faire une requête AJAX
}

    </script>
</section>
