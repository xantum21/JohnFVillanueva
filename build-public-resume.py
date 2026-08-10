#!/usr/bin/env python3
"""Build the privacy-safe one-page resume linked from the portfolio site."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Frame, Paragraph, Spacer


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "assets" / "john-villanueva-resume.pdf"

PAPER = HexColor("#FBF8F2")
NAVY = HexColor("#102A34")
RED = HexColor("#A43A42")
GOLD = HexColor("#D7A85A")
INK = HexColor("#243238")
MUTED = HexColor("#5C5B56")
LINE = HexColor("#D8D0C4")

FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
FONT_REGULAR = "DejaVuSans"
FONT_BOLD = "DejaVuSans-Bold"
FONT_DISPLAY = "DejaVuSerif-Bold"


def register_fonts():
    """Embed stable TrueType fonts so every PDF viewer uses identical metrics."""
    pdfmetrics.registerFont(TTFont(FONT_REGULAR, FONT_DIR / "DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(FONT_BOLD, FONT_DIR / "DejaVuSans-Bold.ttf"))
    pdfmetrics.registerFont(TTFont(FONT_DISPLAY, FONT_DIR / "DejaVuSerif-Bold.ttf"))


def section(title, items, styles):
    flow = [Paragraph(title.upper(), styles["section"]), Spacer(1, 3)]
    flow.extend(items)
    flow.append(Spacer(1, 7))
    return flow


def role(title, meta, bullets, styles):
    flow = [
        Paragraph(title, styles["role"]),
        Paragraph(meta, styles["meta"]),
        Spacer(1, 2),
    ]
    flow.extend(Paragraph(text, styles["bullet"]) for text in bullets)
    flow.append(Spacer(1, 5))
    return flow


def flatten(items):
    result = []
    for item in items:
        if isinstance(item, (list, tuple)):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result


def build_resume(output_path=OUTPUT):
    register_fonts()
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    canvas = Canvas(str(output_path), pagesize=letter, pageCompression=1)
    canvas.setTitle("John Villanueva - Public Resume")
    canvas.setAuthor("John Villanueva")
    canvas.setCreator("build-public-resume.py")
    canvas.setSubject(
        "Healthcare, nursing education, business, leadership, and professional capabilities"
    )

    page_width, page_height = letter
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, page_width, page_height, stroke=0, fill=1)

    # Header
    canvas.setFillColor(NAVY)
    canvas.setFont(FONT_DISPLAY, 21)
    canvas.drawString(40, 742, "JOHN VILLANUEVA")
    canvas.setFont(FONT_REGULAR, 8.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(40, 728, "Care for people. Build useful things. Stay curious.")

    canvas.setFillColor(INK)
    canvas.setFont(FONT_BOLD, 9.2)
    canvas.drawString(338, 746, "BSN Candidate | California CNA")
    canvas.drawString(338, 734, "Former Business Banking Associate")
    canvas.setFont(FONT_REGULAR, 7.8)
    canvas.setFillColor(MUTED)
    contact = "johnfvillanueva.com  |  linkedin.com/in/johnfvillanueva"
    canvas.drawString(338, 720, contact)
    canvas.linkURL(
        "https://johnfvillanueva.com/",
        (338, 718, 338 + stringWidth("johnfvillanueva.com", FONT_REGULAR, 7.8), 729),
        relative=0,
    )
    linkedin_x = 338 + stringWidth("johnfvillanueva.com  |  ", FONT_REGULAR, 7.8)
    canvas.linkURL(
        "https://www.linkedin.com/in/johnfvillanueva/",
        (
            linkedin_x,
            718,
            linkedin_x + stringWidth("linkedin.com/in/johnfvillanueva", FONT_REGULAR, 7.8),
            729,
        ),
        relative=0,
    )

    canvas.setStrokeColor(NAVY)
    canvas.setLineWidth(1.5)
    canvas.line(36, 709, 576, 709)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(3)
    canvas.line(36, 709, 116, 709)

    # Body frame divider
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(354, 52, 354, 694)

    base = getSampleStyleSheet()
    styles = {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.7,
            leading=10.2,
            textColor=INK,
            spaceAfter=3,
            alignment=TA_LEFT,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading3"],
            fontName=FONT_BOLD,
            fontSize=8.5,
            leading=10,
            textColor=RED,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Heading4"],
            fontName=FONT_BOLD,
            fontSize=9.2,
            leading=11,
            textColor=NAVY,
            spaceAfter=0,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.2,
            leading=9,
            textColor=MUTED,
            spaceAfter=0,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.5,
            leading=9.8,
            textColor=INK,
            leftIndent=10,
            firstLineIndent=-7,
            bulletIndent=0,
            spaceAfter=1.5,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.1,
            leading=9.3,
            textColor=MUTED,
            spaceAfter=2,
        ),
    }

    left = [
        section(
            "Professional Summary",
            [
                Paragraph(
                    "BSN candidate and active California Certified Nursing Assistant with "
                    "1,000+ hours of direct patient contact across paid CNA work and supervised "
                    "clinical training. Brings an earlier foundation in business banking, "
                    "marketing, leadership, technology, and client service.",
                    styles["body"],
                ),
                Paragraph(
                    "Known for clear communication, adaptability, and practical systems thinking "
                    "grounded in respectful, patient-centered care.",
                    styles["body"],
                ),
            ],
            styles,
        ),
        section(
            "Healthcare Experience",
            [
                role(
                    "Certified Nursing Assistant",
                    "Skilled nursing and sub-acute care | 2026-Present",
                    [
                        "<bullet>&bull;</bullet>Provide direct resident care including activities of daily living, mobility, transfers, repositioning, toileting, feeding, hygiene, and comfort.",
                        "<bullet>&bull;</bullet>Measure and report vital signs, intake/output observations, and changes in condition; support accurate handoff and documentation.",
                        "<bullet>&bull;</bullet>Collaborate with nursing and rehabilitation teams while supporting infection prevention, fall prevention, skin safety, and discharge readiness.",
                    ],
                    styles,
                ),
                role(
                    "Student Nurse / Clinical Nursing Student",
                    "Nightingale College supervised clinical rotations | 2024-Present",
                    [
                        "<bullet>&bull;</bullet>Develop clinical judgment through assessment, SBAR, safety, medication workflow, patient teaching, care planning, and interdisciplinary communication.",
                        "<bullet>&bull;</bullet>Supervised experience includes wound care, urostomy care, insulin administration, IV discontinuation, nebulizer treatment, mobility support, and head-to-toe assessment.",
                    ],
                    styles,
                ),
            ],
            styles,
        ),
        section(
            "Business and Leadership Experience",
            [
                role(
                    "Business Banking Development Associate",
                    "PNC Bank | 2022-2023",
                    [
                        "<bullet>&bull;</bullet>Supported business bankers and established small-business clients through relationship management, lending and treasury exposure, document coordination, confidential information handling, Salesforce/CRM tracking, and service issue resolution.",
                    ],
                    styles,
                ),
                Paragraph(
                    "<b>Selected earlier experience:</b> Lead Web Development Associate, "
                    "3STEPS4WARD (2023); Marketing Director, COPMORE Partners (2021); "
                    "Customer Service Supervisor III, Fry's Electronics (2018-2019).",
                    styles["small"],
                ),
            ],
            styles,
        ),
        section(
            "Professional Capabilities",
            [
                Paragraph(
                    "<b>Banking and client relations:</b> Relationship management, lending and "
                    "treasury exposure, confidential documentation, Salesforce/CRM, and issue resolution.",
                    styles["small"],
                ),
                Paragraph(
                    "<b>Marketing, web, and operations:</b> Digital marketing, brand messaging, "
                    "web/UX work, customer-service supervision, escalations, and project coordination.",
                    styles["small"],
                ),
                Paragraph(
                    "<b>Japanese and cross-cultural communication:</b> Japanese Language and "
                    "Culture minor, Chuo University study, tutoring, and exchange-program experience.",
                    styles["small"],
                ),
            ],
            styles,
        ),
    ]

    right = [
        section(
            "RN Path",
            [
                Paragraph("<b>BSN completion:</b> April 2027", styles["body"]),
                Paragraph("<b>Planned NCLEX-RN:</b> May-June 2027", styles["body"]),
                Paragraph(
                    "<b>Seeking:</b> Structured new-graduate RN residency; medical-surgical, "
                    "telemetry, acute care, or another unit with strong new-graduate support. "
                    "Available June 2027.",
                    styles["body"],
                ),
            ],
            styles,
        ),
        section(
            "Education",
            [
                role(
                    "Bachelor of Science in Nursing",
                    "Nightingale College | Expected April 2027 | GPA 3.84",
                    [
                        "<bullet>&bull;</bullet>Sigma Theta Tau International Honor Society of Nursing, inducted August 2026.",
                    ],
                    styles,
                ),
                role(
                    "BS Business Administration",
                    "California State University, East Bay | 2022 | GPA 3.82",
                    [
                        "<bullet>&bull;</bullet>Marketing Management concentration; minor in Japanese Language and Culture; President, American Marketing Association.",
                    ],
                    styles,
                ),
                role(
                    "Associate Degrees / Honors",
                    "Los Medanos College | 2015 | GPA 3.5",
                    [
                        "<bullet>&bull;</bullet>Math and Science; Arts and Humanities; Behavioral and Social Sciences; Honors Scholar.",
                    ],
                    styles,
                ),
            ],
            styles,
        ),
        section(
            "Credentials",
            [
                Paragraph("California Certified Nursing Assistant - active", styles["body"]),
                Paragraph("AHA BLS Provider - current", styles["body"]),
                Paragraph("Basic EKG Interpretation - valid August 1, 2026", styles["body"]),
                Paragraph("ACLS - valid August 12, 2026", styles["body"]),
                Paragraph("PALS - valid August 12, 2026", styles["body"]),
                Paragraph(
                    "Dementia, infection control, HIPAA, and resident-safety education",
                    styles["body"],
                ),
            ],
            styles,
        ),
        section(
            "Core Strengths",
            [
                Paragraph(
                    "Direct patient care | Therapeutic communication | Vital signs | Clinical "
                    "observation | SBAR | Safe transfers | Infection prevention | PointClickCare "
                    "exposure | Client service | Leadership | CRM/Salesforce | Japanese language | "
                    "Digital projects",
                    styles["body"],
                )
            ],
            styles,
        ),
        section(
            "Recognition",
            [
                Paragraph(
                    "Honors research presentations at Stanford University and UC Berkeley; "
                    "Smith Center Pitch Day competition finalist; American Marketing "
                    "Association (AMA) chapter president.",
                    styles["small"],
                )
            ],
            styles,
        ),
    ]

    left = flatten(left)
    right = flatten(right)
    left_frame = Frame(40, 50, 300, 650, leftPadding=0, rightPadding=4, topPadding=0, bottomPadding=0)
    right_frame = Frame(368, 50, 208, 650, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    left_frame.addFromList(left, canvas)
    right_frame.addFromList(right, canvas)
    if left or right:
        raise RuntimeError(
            f"Resume content overflowed its one-page frame "
            f"(left blocks: {len(left)}, right blocks: {len(right)})"
        )

    # Footer
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(36, 37, 576, 37)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_REGULAR, 6.7)
    canvas.drawString(36, 25, "johnfvillanueva.com | linkedin.com/in/johnfvillanueva")
    canvas.drawRightString(576, 25, "Updated August 2026 | Verification available to employers")

    canvas.save()
    return output_path


if __name__ == "__main__":
    print(build_resume())
