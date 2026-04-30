"""
Seed the database with initial character data from the Figma design.
Usage: python manage.py seed_characters
"""
import os
import shutil
from django.core.management.base import BaseCommand
from django.core.files import File
from apps.characters.models import Character

# Source images from the Figma project
FIGMA_IMPORTS = r'D:\WorkPlace\Redesign Screens with Action\src\imports'

CHARACTERS_DATA = [
    {
        'name': 'Cyrene',
        'slug': 'cyrene',
        'description': 'Nữ phù thủy bí ẩn sử dụng phép thuật hắc ám với vẻ đẹp u tối quyến rũ. Bộ trang phục chi tiết từ mũ phù thủy hoa đến đôi boots cao, mang đến trải nghiệm cosplay hoàn hảo.',
        'status': 'Available',
        'rental_price': 150,
        'accent_color': '#7C3AED',
        'image_filename': 'cyrene.jpg',
        'origin_game': 'Honkai Star Rail',
        'is_featured': True,
        'rating': 5.0,
        'review_count': 128,
        'sizes_available': ['S', 'M', 'L', 'XL'],
        'components': [
            {'icon': '🎩', 'name': 'Mũ phù thủy hoa'},
            {'icon': '✨', 'name': 'Gậy phép thuật chi tiết'},
            {'icon': '🧤', 'name': 'Găng tay'},
            {'icon': '👗', 'name': 'Váy tím xếp tầng & corset'},
            {'icon': '👢', 'name': 'Boots cao đùi'},
        ],
    },
    {
        'name': 'Herta',
        'slug': 'herta',
        'description': 'Thiên tài điều khiển rối với trí tuệ lạnh lùng và sự dí dỏm u tối. Bộ trang phục học giả xanh navy thanh lịch với phụ kiện bướm tinh xảo.',
        'status': 'In Stock',
        'rental_price': 180,
        'accent_color': '#1E40AF',
        'image_filename': 'herta.jpg',
        'origin_game': 'Honkai Star Rail',
        'is_featured': True,
        'rating': 4.9,
        'review_count': 95,
        'sizes_available': ['S', 'M', 'L'],
        'components': [
            {'icon': '🪆', 'name': 'Phụ kiện rối marionette'},
            {'icon': '🦋', 'name': 'Bộ ghim bướm'},
            {'icon': '👗', 'name': 'Váy học giả xanh navy'},
            {'icon': '🧣', 'name': 'Nơ ren cổ'},
            {'icon': '👞', 'name': 'Giày da bóng'},
        ],
    },
    {
        'name': 'Kiana',
        'slug': 'kiana',
        'description': 'Người thừa kế sức mạnh cổ đại, chiến binh ánh sáng và thánh hỏa. Bộ giáp chiến đấu trắng vàng đẳng cấp với áo choàng năng lượng.',
        'status': 'Limited Availability',
        'rental_price': 200,
        'accent_color': '#0F766E',
        'image_filename': 'kiana.jpg',
        'origin_game': 'Honkai Impact 3rd',
        'is_featured': True,
        'rating': 5.0,
        'review_count': 156,
        'sizes_available': ['S', 'M', 'L', 'XL'],
        'components': [
            {'icon': '🗡️', 'name': 'Cặp súng năng lượng'},
            {'icon': '⚡', 'name': 'Áo choàng thánh quang'},
            {'icon': '👗', 'name': 'Giáp chiến đấu trắng vàng'},
            {'icon': '🧤', 'name': 'Găng tay công nghệ'},
            {'icon': '👢', 'name': 'Boots chiến đấu cao gót'},
        ],
    },
    {
        'name': 'Seele',
        'slug': 'seele',
        'description': 'Bướm ảo ảnh trôi dạt giữa sự sống và thế giới khác. Trang phục tím layered nhẹ nhàng với phụ kiện cánh bướm và liềm replica.',
        'status': 'Available',
        'rental_price': 170,
        'accent_color': '#9D174D',
        'image_filename': 'seele.jpg',
        'origin_game': 'Honkai Star Rail',
        'is_featured': True,
        'rating': 4.8,
        'review_count': 112,
        'sizes_available': ['S', 'M', 'L'],
        'components': [
            {'icon': '🦋', 'name': 'Phụ kiện cánh bướm'},
            {'icon': '⚔️', 'name': 'Liềm replica (prop)'},
            {'icon': '👗', 'name': 'Váy tím xếp tầng'},
            {'icon': '🎀', 'name': 'Nơ tóc & ruy băng'},
            {'icon': '🧦', 'name': 'Tất cao đùi'},
        ],
    },
    {
        'name': 'Hanabi',
        'slug': 'hanabi',
        'description': 'Nữ ninja lửa, nhảy múa giữa cánh hoa và tàn tro. Bộ kimono nghi lễ với phụ kiện hoa anh đào và đai obi bọc giáp.',
        'status': 'In Stock',
        'rental_price': 160,
        'accent_color': '#B91C1C',
        'image_filename': 'hanabi.jpg',
        'origin_game': 'Mobile Legends',
        'is_featured': True,
        'rating': 4.7,
        'review_count': 89,
        'sizes_available': ['S', 'M', 'L', 'XL'],
        'components': [
            {'icon': '🌸', 'name': 'Phụ kiện tóc hoa anh đào'},
            {'icon': '🎋', 'name': 'Áo kimono nghi lễ'},
            {'icon': '🩱', 'name': 'Đai obi bọc giáp'},
            {'icon': '🧤', 'name': 'Găng tay chiến đấu hở ngón'},
            {'icon': '👟', 'name': 'Tất tabi & dép gỗ'},
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed the database with initial character data from Figma design'

    def handle(self, *args, **options):
        self.stdout.write('Seeding characters...')

        for data in CHARACTERS_DATA:
            image_filename = data.pop('image_filename')
            image_path = os.path.join(FIGMA_IMPORTS, image_filename)

            char, created = Character.objects.update_or_create(
                slug=data['slug'],
                defaults={k: v for k, v in data.items()}
            )

            # Copy image if it exists and character doesn't have one
            if os.path.exists(image_path) and (created or not char.image):
                with open(image_path, 'rb') as f:
                    char.image.save(image_filename, File(f), save=True)

            status_str = 'Created' if created else 'Updated'
            self.stdout.write(f'  {status_str}: {char.name}')

        self.stdout.write(self.style.SUCCESS(
            f'Successfully seeded {len(CHARACTERS_DATA)} characters!'
        ))
