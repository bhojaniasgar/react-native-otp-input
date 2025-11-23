require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-otp-input"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.4" }
  s.source       = { :git => "https://github.com/bhojaniasgar/react-native-otp-input.git", :tag => "#{s.version}" }

  # No native iOS code needed - this is a JavaScript-only library for iOS
  s.source_files = "react-native-otp-input.podspec"

  install_modules_dependencies(s)
end
