[Setup]
AppName=Clinote Whisper Server
AppVersion=1.0.0
AppPublisher=Clinote
AppPublisherURL=https://clinote.app
DefaultDirName={autopf}\Clinote\WhisperServer
DefaultGroupName=Clinote
OutputDir=output
OutputBaseFilename=clinote-whisper-windows-setup
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "startup"; Description: "Start Clinote Whisper Server on Windows startup"; GroupDescription: "Startup Options"; Flags: unchecked

[Files]
Source: "..\local-server\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "python-3.11.0-amd64.exe"; DestDir: "{tmp}"; Flags: deleteafterinstall

[Icons]
Name: "{group}\Clinote Whisper Server"; Filename: "{app}\whisper_server.py"; IconFilename: "{app}\icon.ico"
Name: "{group}\Uninstall Clinote Whisper Server"; Filename: "{uninstallexe}"
Name: "{commondesktop}\Clinote Whisper Server"; Filename: "{app}\whisper_server.py"; Tasks: desktopicon

[Run]
Filename: "{tmp}\python-3.11.0-amd64.exe"; Parameters: "/quiet InstallAllUsers=1 PrependPath=1"; StatusMsg: "Installing Python 3.11..."; Flags: waituntilterminated
Filename: "{app}\install_dependencies.bat"; StatusMsg: "Installing Python dependencies..."; Flags: waituntilterminated
Filename: "{app}\start_server.bat"; Description: "Start Clinote Whisper Server now"; Flags: postinstall nowait skipifsilent

[Registry]
Root: HKLM; Subkey: "SOFTWARE\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "ClinoteWhisperServer"; ValueData: """{app}\start_server.bat"""; Tasks: startup; Flags: uninsdeletevalue

[Code]
function InitializeSetup(): Boolean;
begin
  Result := True;
end;

[UninstallDelete]
Type: filesandordirs; Name: "{app}" 