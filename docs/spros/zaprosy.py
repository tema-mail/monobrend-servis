# марка: (латиница, русское написание, [модели])
B = {
 'lixiang': ('lixiang', 'лисян', ['l6','l7','l8','l9','i6','i8','mega']),
 'zeekr': ('zeekr', 'зикр', ['001','007','009','7x','x','9x','8x','mix']),
 'voyah': ('voyah', 'воя', ['free','dream','passion','courage']),
 'lynk': ('lynk co', 'линк ко', ['01','05','06','07','08','09','900','z10','03']),
 'geely': ('geely', 'джили', ['ex5','ex5 em-i','galaxy','starship 7','galaxy l7','galaxy l6','galaxy e5','galaxy e8','galaxy m9','ex2','starshine 6']),
 'changan': ('changan', 'чанган', ['qiyuan a06','qiyuan a07','qiyuan q05','qiyuan q07','qiyuan a05','uni k idd']),
 'deepal': ('deepal', 'дипал', ['s07','l07','s05','g318']),
 'byd': ('byd', 'бид', ['song plus','song l','han','seal','tang','qin plus','qin l','sealion 07','atto 3','seagull','yuan up','song pro']),
 'denza': ('denza', 'денза', ['n7','n8','n9','d9','z9gt']),
 'fangchengbao': ('fangchengbao', 'фанчэнбао', ['leopard 5','leopard 8','bao 5','tai 3','tai 7']),
 'avatr': ('avatr', 'аватр', ['06','07','11','12']),
 'xiaomi': ('xiaomi su7', 'сяоми su7', ['su7','yu7']),
 'aito': ('aito', 'аито', ['m5','m7','m8','m9']),
 'exlantix': ('exlantix', 'экслантикс', ['et','es']),
 'tank': ('tank hi4', 'танк гибрид', ['500 hi4','400 hi4']),
 'gac': ('gac', 'гак', ['s7','aion']),
 'hongqi': ('hongqi', 'хончи', ['eh7','e hs9']),
 'leapmotor': ('leapmotor', 'липмотор', ['c10','c11','c16']),
 'rox': ('rox 01', 'рокс 01', []),
}
Q = []
for k, (lat, ru, models) in B.items():
    base = 'xiaomi' if k == 'xiaomi' else ('tank' if k == 'tank' else lat)
    for p in [lat, f'ремонт {base}', f'сервис {base}', f'то {base}', f'ремонт {ru}']:
        Q.append((k, '', p))
    for m in models:
        Q.append((k, m, f'{base} {m}'))
        Q.append((k, m, f'ремонт {base} {m}'))
