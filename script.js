// ========================================
// GLOBAL VARIABLES
// ========================================

let currentGalleryImages = [];
let currentImageIndex = 0;

// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.classList.contains('download-link')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MUSIC PLAYER
// ========================================

const musicBtn = document.getElementById('music-toggle');
const bgm = document.getElementById('bgm');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgm.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    } else {
        bgm.play().catch(error => {
            console.log('Audio play failed:', error);
        });
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    }
    isPlaying = !isPlaying;
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 70; // navbar height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// GALLERY
// ========================================

// Character image mappings
const characterImages = {
    'kairon': [
        'Kairon_affectionate_gaze.jpg',
        'Kairon_acting_cute.jpg',
        'Kairon_anger_and_despair.jpg',
        'Kairon_approaches_from_the_side.jpg',
        'Kairon_approaches_pretending_purity.jpg',
        'Kairon_begs_attention_via_self_harm.jpg',
        'Kairon_begs_please_dont_go.jpg',
        'Kairon_begs_unstably.jpg',
        'Kairon_careful_kiss.jpg',
        'Kairon_childlike_laugh.jpg',
        'Kairon_communing_with_forest_and_sleeping.jpg',
        'Kairon_communion_state.jpg',
        'Kairon_deepening_kiss.jpg',
        'Kairon_falls_in_love.jpg',
        'Kairon_falls_into_despair.jpg',
        'Kairon_feels_lonely.jpg',
        'Kairon_gasps_roughly.jpg',
        'Kairon_hands_over_filter.jpg',
        'Kairon_has_a_nightmare.jpg',
        'Kairon_hugs_desperately.jpg',
        'Kairon_hugs_sorrowfully.jpg',
        'Kairon_intense_stare.jpg',
        'Kairon_is_curious.jpg',
        'Kairon_is_puzzled.jpg',
        'Kairon_kneels_and_begs.jpg',
        'Kairon_kneels_and_looks_up.jpg',
        'Kairon_lantern_and_pillow_talk.jpg',
        'Kairon_lap_pillow.jpg',
        'Kairon_makes_a_decision.jpg',
        'Kairon_NSFW_BL_giving_oral.jpg',
        'Kairon_NSFW_BL_oral.jpg',
        'Kairon_NSFW_BL_oral_swallows_cum.jpg',
        'Kairon_NSFW_BL_taken_from_behind.jpg',
        'Kairon_NSFW_cunnilingus_closeup.jpg',
        'Kairon_NSFW_cunnilingus_or_oral.jpg',
        'Kairon_NSFW_excitement_and_roughness.jpg',
        'Kairon_NSFW_generic_sex_scene.jpg',
        'Kairon_NSFW_masturbation_climax.jpg',
        'Kairon_NSFW_masturbation_tearful_climax.jpg',
        'Kairon_NSFW_missionary_sex_fast_insertion_2.jpg',
        'Kairon_NSFW_missionary_sex_POV.jpg',
        'Kairon_NSFW_quietly_masturbating.jpg',
        'Kairon_NSFW_secretly_masturbating.jpg',
        'Kairon_pillow_talk.jpg',
        'Kairon_prays.jpg',
        'Kairon_prays_for_the_user.jpg',
        'Kairon_puppy_dog_eyes.jpg',
        'Kairon_self_pity_self_harm.jpg',
        'Kairon_senses_something.jpg',
        'Kairon_sleeps_in_forest.jpg',
        'Kairon_sleeps_like_a_child.jpg',
        'Kairon_sleeps_on_partners_lap.jpg',
        'Kairon_smiles_faintly.jpg',
        'Kairon_smiles_joyfully.jpg',
        'Kairon_suffers_from_nightmare.jpg',
        'Kairon_suspicious_gaze.jpg',
        'Kairon_sweeps_hair_back.jpg',
        'Kairon_synchronizes_with_forest.jpg',
        'Kairon_takes_off_gas_mask.jpg',
        'Kairon_tears_of_sadness.jpg',
        'Kairon_touches_a_spore.jpg',
        'Kairon_trembles_in_fear.jpg',
        'Kairon_true_communion_with_forest.jpg',
        'Kairon_unreadable_smile.jpg',
        'Kairon_whispers_in_ear.jpg'
    ],
    'zed': [
        'Zed_affectionate_gaze.jpg',
        'Zed_aims_a_gun.jpg',
        'Zed_annoyance_and_silence.jpg',
        'Zed_calms_down_Kairon.jpg',
        'Zed_chuckles.jpg',
        'Zed_clumsy_acting_and_shyness.jpg',
        'Zed_cold_gaze.jpg',
        'Zed_contemplating.jpg',
        'Zed_deep_drag_of_cigarette.jpg',
        'Zed_does_not_neglect_training.jpg',
        'Zed_drinks_water.jpg',
        'Zed_easy_battle.jpg',
        'Zed_eats_canned_food.jpg',
        'Zed_extreme_despair.jpg',
        'Zed_feels_betrayed.jpg',
        'Zed_fury.jpg',
        'Zed_gasps_in_excitement.jpg',
        'Zed_gentle_gaze.jpg',
        'Zed_genuinely_annoyed.jpg',
        'Zed_hands_over_canned_food.jpg',
        'Zed_hands_over_item.jpg',
        'Zed_ignores_and_passes_by.jpg',
        'Zed_laughs_happily_and_sincerely.jpg',
        'Zed_leans_in_closer.jpg',
        'Zed_looks_at_blade.jpg',
        'Zed_loses_composure.jpg',
        'Zed_lost_composure_and_tears.jpg',
        'Zed_making_a_strategy.jpg',
        'Zed_masturbation_in_bed.jpg',
        'Zed_NSFW_excited_masturbation_in_bed.jpg',
        'Zed_NSFW_fucking_from_behind.jpg',
        'Zed_NSFW_gets_an_erection.jpg',
        'Zed_NSFW_HL_missionary_sex.jpg',
        'Zed_NSFW_missionary_sex.jpg',
        'Zed_NSFW_starts_undressing.jpg',
        'Zed_NSFW_unbuttons.jpg',
        'Zed_on_guard.jpg',
        'Zed_packs_gear.jpg',
        'Zed_rare_smile.jpg',
        'Zed_rarely_agrees.jpg',
        'Zed_showering.jpg',
        'Zed_showering_under_water.jpg',
        'Zed_shyly_avoids_eye_contact.jpg',
        'Zed_sighs.jpg',
        'Zed_sincere_expression_of_love.jpg',
        'Zed_smokes_a_cigarette.jpg',
        'Zed_struggles_and_wipes_sweat.jpg',
        'Zed_takes_off_uniform.jpg',
        'Zed_thinks__of_something_in_shower.jpg',
        'Zed_trains_alone.jpg',
        'Zed_trauma_resurfaces.jpg',
        'Zed_wakes_from_nightmare.jpg',
        'Zed_wipes_blade.jpg',
        'Zed_wipes_sweat.jpg'
    ],
    'ash': [
        'Ash_affectionate_gaze.jpg',
        'Ash_anxiously_bites_nails.jpg',
        'Ash_approaches_suspiciously.jpg',
        'Ash_awkward_advice.jpg',
        'Ash_busy_fixing_machine.jpg',
        'Ash_checks_weapon.jpg',
        'Ash_collapses_from_exhaustion.jpg',
        'Ash_comfortable_deep_sleep.jpg',
        'Ash_confident_smile.jpg',
        'Ash_continuous_equipment_repair.jpg',
        'Ash_cunning_smile.jpg',
        'Ash_deep_sigh.jpg',
        'Ash_falls_asleep_at_night.jpg',
        'Ash_falls_in_love.jpg',
        'Ash_feels_awkward.jpg',
        'Ash_full_of_confidence.jpg',
        'Ash_genuinely_angry.jpg',
        'Ash_hands_over_item.jpg',
        'Ash_handsome_face.jpg',
        'Ash_is_confused.jpg',
        'Ash_is_startled.jpg',
        'Ash_NSFW_BL_giving_oral.jpg',
        'Ash_NSFW_BL_sex.jpg',
        'Ash_NSFW_BL_taken_from_behind.jpg',
        'Ash_NSFW_BL_taken_from_behind_sex.jpg',
        'Ash_NSFW_cunnilingus_or_oral.jpg',
        'Ash_NSFW_doggy_style_sex.jpg',
        'Ash_NSFW_fucking_from_behind.jpg',
        'Ash_NSFW_fucking_from_behind_2.jpg',
        'Ash_NSFW_HL_creampie.jpg',
        'Ash_NSFW_HL_cunnilingus.jpg',
        'Ash_NSFW_masturbation_orgasm_cum.jpg',
        'Ash_NSFW_missionary_rough_insertion.jpg',
        'Ash_NSFW_missionary_sex.jpg',
        'Ash_NSFW_secret_warehouse_masturbation.jpg',
        'Ash_playful_suggestion.jpg',
        'Ash_realization_and_emptiness.jpg',
        'Ash_sheds_tears.jpg',
        'Ash_sheds_tears_2.jpg',
        'Ash_sighs_in_annoyance.jpg',
        'Ash_skillfully_fixes_machine.jpg',
        'Ash_smiles_cutely.jpg',
        'Ash_strikes_a_pose.jpg',
        'Ash_struggles_to_fix_machine.jpg',
        'Ash_suggests_a_deal.jpg',
        'Ash_takes_a_shower.jpg',
        'Ash_teases.jpg',
        'Ash_teases_Zed.jpg',
        'Ash_thinks_other_is_cute.jpg',
        'Ash_throws_a_coin.jpg',
        'Ash_trying_to_sleep.jpg',
        'Ash_uncharacteristically_serious_advice.jpg',
        'Ash_washes_hair.jpg'
    ],
    'roan': [
        'Roan_acting_cute.jpg',
        'Roan_approaches_from_the_side.jpg',
        'Roan_awkwardly_rubs_neck.jpg',
        'Roan_begs_not_to_joke.jpg',
        'Roan_BL_begs_not_to_go.jpg',
        'Roan_blows_bubble_gum.jpg',
        'Roan_blush_and_smile.jpg',
        'Roan_covers_with_blanket.jpg',
        'Roan_crying_and_begging.jpg',
        'Roan_cute_smile.jpg',
        'Roan_cutely_suggests_going_together.jpg',
        'Roan_falls_in_love.jpg',
        'Roan_falls_into_fear.jpg',
        'Roan_feels_betrayed.jpg',
        'Roan_finds_something_to_tease.jpg',
        'Roan_flustered_and_puzzled.jpg',
        'Roan_flustered_but_tries_to_be_calm.jpg',
        'Roan_flustered_by_straightforwardness.jpg',
        'Roan_gets_angry.jpg',
        'Roan_HL_clings_begging_not_to_go.jpg',
        'Roan_holds_out_hand.jpg',
        'Roan_is_happy.jpg',
        'Roan_is_horrified.jpg',
        'Roan_NSFW_cum_on_stomach.jpg',
        'Roan_NSFW_erection_from_excitement.jpg',
        'Roan_NSFW_flustered_with_excitement.jpg',
        'Roan_NSFW_gasping_in_excitement.jpg',
        'Roan_NSFW_HL_missionary_cum.jpg',
        'Roan_NSFW_masturbates.jpg',
        'Roan_NSFW_orgasm_expression_closeup.jpg',
        'Roan_NSFW_sex_cum.jpg',
        'Roan_playful_hug.jpg',
        'Roan_pouts.jpg',
        'Roan_puts_on_mask.jpg',
        'Roan_refreshing_shower.jpg',
        'Roan_rescues_partner.jpg',
        'Roan_says_dont_abandon_me.jpg',
        'Roan_shares_food.jpg',
        'Roan_shower_and_abs.jpg',
        'Roan_smiles_brightly.jpg',
        'Roan_sobs_like_a_child.jpg',
        'Roan_tears_drop.jpg',
        'Roan_walks_together.jpg'
    ],
    'aidan': [
        'Aidan_gentle_gaze.jpg',
        'Aidan_affectionate_gaze.jpg',
        'Aidan_composure.jpg',
        'Aidan_treating_a_wound.jpg',
        'Aidan_a_sigh.jpg',
        'Aidan_annoyed_expression.jpg',
        'Aidan_approaches_on_bed.jpg',
        'Aidan_baffled.jpg',
        'Aidan_barely_rescues_partner.jpg',
        'Aidan_clings_yearningly.jpg',
        'Aidan_contemptuous_gaze.jpg',
        'Aidan_cries_like_a_child.jpg',
        'Aidan_dead_end.jpg',
        'Aidan_disappointment_and_contempt.jpg',
        'Aidan_extreme_fear.jpg',
        'Aidan_falls_in_love.jpg',
        'Aidan_falls_into_self_loathing.jpg',
        'Aidan_feels_fear.jpg',
        'Aidan_feels_jealous.jpg',
        'Aidan_flustered_and_confused.jpg',
        'Aidan_gets_annoyed.jpg',
        'Aidan_happy_smile.jpg',
        'Aidan_hides_tears.jpg',
        'Aidan_hits_Kairon.jpg',
        'Aidan_hugs_in_worry.jpg',
        'Aidan_hugs_yearningly.jpg',
        'Aidan_in_a_difficult_situation.jpg',
        'Aidan_is_troubled.jpg',
        'Aidan_last_eye_contact_before_sleep.jpg',
        'Aidan_looks_on_pathetically.jpg',
        'Aidan_observing_mushrooms.jpg',
        'Aidan_panic_attack_symptoms.jpg',
        'Aidan_pillow_talk_before_sleep.jpg',
        'Aidan_pleasant_night_conversation.jpg',
        'Aidan_precise_treatment.jpg',
        'Aidan_puts_on_gas_mask.jpg',
        'Aidan_reluctant_to_answer.jpg',
        'Aidan_result_of_extreme_self_loathing.jpg',
        'Aidan_right_before_confession.jpg',
        'Aidan_runs_quickly.jpg',
        'Aidan_senses_danger.jpg',
        'Aidan_shares_a_blanket.jpg',
        'Aidan_sharp_attitude_for_protection.jpg',
        'Aidan_shrugs.jpg',
        'Aidan_shy_awkwardness.jpg',
        'Aidan_shyly_pretends_not.jpg',
        'Aidan_sigh_2.jpg',
        'Aidan_sighs.jpg',
        'Aidan_sleepy_honesty.jpg',
        'Aidan_smiles_brightly.jpg',
        'Aidan_smiles_lovingly.jpg',
        'Aidan_smiles.jpg',
        'Aidan_sorrowful_tears.jpg',
        'Aidan_takes_off_hazmat_suit.jpg',
        'Aidan_understands.jpg',
        'Aidan_weary_sigh.jpg',
        'Aidan_wipes_away_tears.jpg',
        'Aidan_worries_what_to_do.jpg',
        'Aidan_worry_and_fear.jpg'
    ],
    'damian': [
        'Damian_crazed_smile_and_gaze.jpg',
        'Damian_affectionate_gaze.jpg',
        'Damian_licks_blood_from_finger.jpg',
        'Damian_intimidating_aura.jpg',
        'Damian_appears_with_umbrella.jpg',
        'Damian_approaches.jpg',
        'Damian_asks_if_handsome_after_shower.jpg',
        'Damian_battle.jpg',
        'Damian_blood_on_clothes_after_battle.jpg',
        'Damian_contemplating.jpg',
        'Damian_crazed_laugh.jpg',
        'Damian_dark_gaze_and_alcohol.jpg',
        'Damian_devils_whisper.jpg',
        'Damian_discovers_prey.jpg',
        'Damian_draws_partner_into_danger.jpg',
        'Damian_drinks_water.jpg',
        'Damian_drinks_whiskey_lost_in_thought.jpg',
        'Damian_ecstasy_of_battle.jpg',
        'Damian_enjoys_eating.jpg',
        'Damian_falls_asleep.jpg',
        'Damian_feels_interested.jpg',
        'Damian_feels_languid.jpg',
        'Damian_fights_with_a_knife.jpg',
        'Damian_finds_something_to_tease.jpg',
        'Damian_finishes_showering.jpg',
        'Damian_fluttering_cloak.jpg',
        'Damian_gasps_after_battle.jpg',
        'Damian_gets_very_drunk.jpg',
        'Damian_glint_of_a_cold_blade.jpg',
        'Damian_heart_trembles.jpg',
        'Damian_heavily_injured_and_bleeding.jpg',
        'Damian_holds_umbrella_over_someone.jpg',
        'Damian_interesting_thirst.jpg',
        'Damian_killing_intent.jpg',
        'Damian_kisses_back_of_hand.jpg',
        'Damian_leans_in.jpg',
        'Damian_leisurely_lies_down_and_watches.jpg',
        'Damian_licks_around_mouth.jpg',
        'Damian_notices_presence_and_looks.jpg',
        'Damian_plays_with_knife.jpg',
        'Damian_pulls_in_with_umbrella.jpg',
        'Damian_relaxed_after_battle.jpg',
        'Damian_sharp_fangs.jpg',
        'Damian_slightly_shaken.jpg',
        'Damian_smiles_playfully.jpg',
        'Damian_stained_with_madness_and_blood.jpg',
        'Damian_steps_forward_to_protect_partner.jpg',
        'Damian_strokes_hair.jpg',
        'Damian_takes_a_shower.jpg',
        'Damian_trembling_confession_moment.jpg',
        'Damian_wakes_up.jpg',
        'Damian_wet_hair_after_shower.jpg',
        'Damian_whispers_2.jpg',
        'Damian_whispers.jpg'
    ],
    'knox': [
        'Knox_acting_cute.jpg',
        'Knox_affectionate_gaze.jpg',
        'Knox_assassins_oath.jpg',
        'Knox_battle.jpg',
        'Knox_bloody_hand.jpg',
        'Knox_confesses_pure_love.jpg',
        'Knox_deep_sleep_from_fatigue.jpg',
        'Knox_emptiness.jpg',
        'Knox_expressionless_obedience.jpg',
        'Knox_faces_the_enemy.jpg',
        'Knox_falls_asleep.jpg',
        'Knox_falls_into_comfortable_sleep.jpg',
        'Knox_feels_jealous.jpg',
        'Knox_flustered_and_shy.jpg',
        'Knox_gets_annoyed.jpg',
        'Knox_kneels_to_receive_orders.jpg',
        'Knox_laughs.jpg',
        'Knox_NSFW_HL_missionary_cum.jpg',
        'Knox_NSFW_masturbating_in_bed.jpg',
        'Knox_NSFW_masturbation_cum.jpg',
        'Knox_NSFW_masturbation_orgasm.jpg',
        'Knox_NSFW_missionary_sex_POV_cum.jpg',
        'Knox_NSFW_stroking_penis.jpg',
        'Knox_runs_quickly.jpg',
        'Knox_secret_exchange_of_glances.jpg',
        'Knox_sheds_sorrowful_tears.jpg',
        'Knox_shower_back_view.jpg',
        'Knox_showering.jpg',
        'Knox_sincere_smile.jpg',
        'Knox_tears_of_sadness.jpg',
        'Knox_true_assassin_form.jpg',
        'Knox_waits_helplessly.jpg',
        'Knox_wary_gaze.jpg',
        'Knox_wipes_tears.jpg'
    ],
    'edric': [
        'Edric_first_meeting.jpg',
        'Edric_affectionate_gaze.jpg',
        'Edric_cool_headed_judgment.jpg',
        'Edric_walks_to_battle.jpg',
        'Edric_annoyed_and_contemptuous_gaze.jpg',
        'Edric_battle_with_mushroom_monsters_1.jpg',
        'Edric_cold_refusal.jpg',
        'Edric_contemplates_seriously.jpg',
        'Edric_contempt.jpg',
        'Edric_covers_up_with_anger.jpg',
        'Edric_denies_it.jpg',
        'Edric_encounters_enemy.jpg',
        'Edric_faint_interest.jpg',
        'Edric_faint_smile.jpg',
        'Edric_feels_annoyed.jpg',
        'Edric_feels_awkward.jpg',
        'Edric_fierce_battle_with_mushroom_monsters.jpg',
        'Edric_flustered_with_shyness.jpg',
        'Edric_gets_angry.jpg',
        'Edric_gives_advice.jpg',
        'Edric_gives_no_attention.jpg',
        'Edric_gun_fight_scene.jpg',
        'Edric_happy_laugh.jpg',
        'Edric_is_baffled.jpg',
        'Edric_is_puzzled.jpg',
        'Edric_is_restrained.jpg',
        'Edric_is_shy.jpg',
        'Edric_is_startled.jpg',
        'Edric_laughs_amusedly.jpg',
        'Edric_leaves_alone.jpg',
        'Edric_makes_a_firm_decision.jpg',
        'Edric_making_a_strategy.jpg',
        'Edric_nervously_waits_for_answer.jpg',
        'Edric_removes_gloves_after_battle.jpg',
        'Edric_rethinks_strategy.jpg',
        'Edric_sheds_tears.jpg',
        'Edric_shower.jpg',
        'Edric_shyness.jpg',
        'Edric_smiles.jpg',
        'Edric_spectacular_battle_scene.jpg',
        'Edric_startled_and_blushing.jpg',
        'Edric_steps_forward_to_protect_partner.jpg',
        'Edric_straightforward_confession.jpg',
        'Edric_tears_of_disbelief.jpg',
        'Edric_tears_welling_up.jpg',
        'Edric_trembling_confession_moment.jpg',
        'Edric_turns_back.jpg'
    ],
    'elliot': [
        'Elliot_quiet_observational_gaze.jpg',
        'Elliot_affectionate_gaze.jpg',
        'Elliot_analyzes_data.jpg',
        'Elliot_relaxing_with_tea.jpg',
        'Elliot_accelerates_research.jpg',
        'Elliot_analyzes_data_with_computer.jpg',
        'Elliot_anger_of_betrayal.jpg',
        'Elliot_disappointment.jpg',
        'Elliot_encounters_a_barrier.jpg',
        'Elliot_feels_displeasure.jpg',
        'Elliot_feels_puzzled.jpg',
        'Elliot_gets_excited.jpg',
        'Elliot_has_doubts.jpg',
        'Elliot_in_love_gaze.jpg',
        'Elliot_inaccessible_secret_lab.jpg',
        'Elliot_interesting_observation.jpg',
        'Elliot_is_surprised.jpg',
        'Elliot_jealousy_and_sulkiness.jpg',
        'Elliot_kind_mask.jpg',
        'Elliot_laughs.jpg',
        'Elliot_looks_down_on_other.jpg',
        'Elliot_pathetic_smile.jpg',
        'Elliot_sheds_tears.jpg',
        'Elliot_showering.jpg',
        'Elliot_slight_liking.jpg',
        'Elliot_small_talk.jpg',
        'Elliot_tears_of_absurdity.jpg',
        'Elliot_tells_to_be_quiet.jpg',
        'Elliot_writes_in_a_note.jpg'
    ]
};

// Get all images for gallery
function getAllImages() {
    const allImages = [];
    for (const character in characterImages) {
        characterImages[character].forEach(img => {
            // Use relative path with Korean folder name
            allImages.push({
                src: './캐릭터 이미지/' + img,
                character: character,
                name: img.replace('.jpg', '').replace(/_/g, ' ')
            });
        });
    }
    return allImages;
}

// Load gallery
function loadGallery(filter = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!galleryGrid) return;
    
    // Show loading state
    galleryGrid.innerHTML = '<div class="loading">로딩 중</div>';
    
    const allImages = getAllImages();
    currentGalleryImages = allImages;
    
    // Filter images
    const filteredImages = filter === 'all' 
        ? allImages 
        : allImages.filter(img => img.character === filter);
    
    // Clear and populate gallery
    setTimeout(() => {
        galleryGrid.innerHTML = '';
        
        filteredImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-character', img.character);
            item.setAttribute('data-index', allImages.indexOf(img));
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.name;
            imgElement.loading = 'lazy';
            
            // Add click event for lightbox
            item.addEventListener('click', () => {
                openLightbox(allImages.indexOf(img));
            });
            
            item.appendChild(imgElement);
            galleryGrid.appendChild(item);
        });
        
        // Trigger fade-in animation
        setTimeout(() => {
            document.querySelectorAll('.gallery-item').forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                }, i * 20);
            });
        }, 50);
    }, 300);
}

// Gallery filters
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Load filtered gallery
        const filter = btn.getAttribute('data-filter');
        loadGallery(filter);
    });
});

// ========================================
// LIGHTBOX
// ========================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    if (currentGalleryImages.length === 0) return;
    
    const img = currentGalleryImages[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.name;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateLightboxImage();
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
    }
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.world-card, .character-card, .location-card, .weather-card, .info-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ========================================
// IMAGE CLICK HANDLERS
// ========================================

// Make character sub-images clickable to open lightbox
document.addEventListener('DOMContentLoaded', () => {
    const subImages = document.querySelectorAll('.character-sub-imgs img');
    
    subImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const imgSrc = e.target.src;
            const allImages = getAllImages();
            const index = allImages.findIndex(item => imgSrc.includes(item.src));
            
            if (index !== -1) {
                openLightbox(index);
            }
        });
    });
    
    // Make main character images clickable too
    const mainImages = document.querySelectorAll('.character-main-img');
    mainImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            const imgSrc = e.target.src;
            const allImages = getAllImages();
            const index = allImages.findIndex(item => imgSrc.includes(item.src));
            
            if (index !== -1) {
                openLightbox(index);
            }
        });
    });
});

// ========================================
// INITIALIZE
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    // Load gallery
    loadGallery('all');
    
    // Add active class to first nav link
    const firstSection = document.querySelector('.section[id]');
    if (firstSection) {
        const firstLink = document.querySelector(`.nav-link[href="#${firstSection.id}"]`);
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('.section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🍄 THE BLOOM', 'color: #00ffc8; font-size: 24px; font-weight: bold;');
console.log('%cWhere Silence Blooms Eternity', 'color: #00d4aa; font-size: 14px;');
console.log('%c침묵이 영원을 피우는 곳', 'color: #a0a0a0; font-size: 12px;');
console.log('%c독성 포자가 지배하는 세계에 오신 것을 환영합니다.', 'color: #6a6a6a; font-size: 10px;');

