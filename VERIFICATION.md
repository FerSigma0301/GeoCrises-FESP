# Verification

The browser preview was checked after the navigation update. The fixed desktop sidebar exposes Mapa, Economia, and Decisões; the mobile tab navigation is present in the responsive layout. The Economia tab successfully hides the map and decision card, showing the Finance & Strategy module with revenue, contracts, and dynamic market. No visible references to Science Fair questions remain. `pnpm check` and `pnpm build` pass.

## Latest update

The last-module preference is stored as `geocrisis:last-module` in localStorage. Browser verification confirmed that selecting Economia and reloading restores Economia. The Economy module displays an SVG finance history chart with current balance, movement count, and green/red transaction points. Module sections use keyed enter animations for smooth transitions. `pnpm check` and `pnpm build` pass.

## PDR gameplay improvements

The decision cards now show rarity labels, hover lift, and compact impact comparison bars. The XP HUD now displays player level and distance to the next level. After an automated decision and meteorological event in the browser, the new Round Summary appeared with finance, population, sustainability, lives, and XP deltas; the event correctly showed -1 life and the chart updated from 1000 to 720 finance. The demo query was also corrected so only `demo=1` or `demo=true` triggers autoplay.

## Campaign order, rewards, cards, and hologram

The campaign now visibly begins with Seca Severa and Colapso Hídrico, followed by the agricultural crisis, flood, landslide, deforestation, wildfire, heatwave, sea-level, displacement, cyclone, volcano, earthquake, pollution, biodiversity, and pandemic. The Economy module visibly includes Seguro Paramétrico Climático, Licença de Dados Abertos, the All-in risk contract, and two new market offers. Cards show rarity badges and impact bars. The Earth scene now includes an animated wireframe hologram, latitude bands, atmosphere pulse, scan sweep, and a safe fallback overlay when WebGL is unavailable in the preview environment.

## Menu, tutorial, modes, and expanded crises

The initial menu was visually verified with four selectable modes: Campanha, Survival, Sandbox, and Speedrun. The tutorial modal was opened and displayed four onboarding steps covering map reading, card choice, economy, and unexpected events. Survival was selected and started successfully; the interface showed the Survival badge, RODADA 1, and the reversed high-pressure crisis deck beginning with the pandemic crisis. The catalog now contains 19 ordered crisis entries, including energy, ocean, cyber infrastructure, and food logistics categories.
